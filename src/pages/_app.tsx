import { RootLayout } from "@/components";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SkeletonTheme } from "react-loading-skeleton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <ToastContainer />
          </SkeletonTheme>
        </RootLayout>
      </SessionProvider>
    </QueryClientProvider>
  );
}
