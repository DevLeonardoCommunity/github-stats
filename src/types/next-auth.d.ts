import { GitHubUser } from "./session";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: GitHubUser;
    accessToken: string;
    refreshToken: string;
    iat: number;
    exp: number;
    jti: string;
  }
}
