import { RootLayout } from "@/components";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SkeletonTheme } from "react-loading-skeleton";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <RootLayout>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Component {...pageProps} />
          </SkeletonTheme>
        </RootLayout>
      </SessionProvider>
    </QueryClientProvider>
  );
}
