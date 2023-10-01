import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head />
      <body className="light-mode dark:dark-mode">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
