import { Inter } from "next/font/google";
import Head from "next/head";
import Header from "./header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>GitHub Stats</title>
      </Head>
      <Header />
      <main className={inter.className}>{children}</main>
    </>
  );
}
