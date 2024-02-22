import { Inter } from "next/font/google";
import Head from "next/head";
import { Header } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>GitHub Stats</title>
      </Head>
      <Header />
      <main className={inter.className}>{children}</main>
    </>
  );
};
