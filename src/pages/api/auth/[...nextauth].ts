import { GitHubUser } from "@/types/session";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Octokit } from "octokit";

export const MAIN_LOGIN_PROVIDER =
  process.env.NODE_ENV === "development" ? undefined : "github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          image: profile.avatar_url,
          login: profile.login,
        } as GitHubUser;
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize() {
        if (process.env.NODE_ENV !== "development")
          throw new Error("CredentialsProvider can only be used in dev mode");

        if (!process.env.DEV_GITHUB_TOKEN)
          throw new Error("No DEV_GITHUB_TOKEN env variable set");

        const gh = new Octokit({
          auth: process.env.DEV_GITHUB_TOKEN,
        });

        const { viewer } = await gh.graphql<{ viewer: any }>(`
          {
            viewer {
              id
              name
              login
              avatarUrl
            }
          }
          `);

        return {
          id: viewer.id,
          name: viewer.name,
          login: viewer.login,
          image: viewer.avatarUrl,
          accessToken: process.env.DEV_GITHUB_TOKEN,
        } as GitHubUser & { accessToken: string };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, account }) {
      if (account?.type === "credentials" && user) {
        const { accessToken, ...rest } = user as any;

        return {
          accessToken,
          user: rest,
        };
      }

      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          user,
        };
      }

      return token;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/`;
    },
    session({ session, token }: any) {
      return {
        ...session,
        user: token.user,
        accessToken: token.accessToken,
      };
    },
  },
});
