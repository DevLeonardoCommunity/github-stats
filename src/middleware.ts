export { default } from "next-auth/middleware";

export const config = { matcher: ["/stats/:path*", "/profile"] };
