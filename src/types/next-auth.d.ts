import NextAuth from "next-auth";
import { GitHubUser } from "./session";

declare module "next-auth" {
  interface Session {
    user: GitHubUser;
    accessToken: string;
    refreshToken: string;
    iat: number;
    exp: number;
    jti: string;
  }
}
