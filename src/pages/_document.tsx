import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head />
      <body className="light-mode dark:dark-mode">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                document.documentElement.dataset.theme = theme;
                theme === "custom-dark"
                  ? document.documentElement.classList.add("dark")
                  : document.documentElement.classList.remove("dark");
              })()
            `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
