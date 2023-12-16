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
                if (theme === "custom-dark" || (!theme && window.matchMedia("(prefers-color-scheme:dark)").matches)) {
                  document.documentElement.dataset.theme = "custom-dark";
                  document.documentElement.classList.add("dark")
                } else {
                  document.documentElement.dataset.theme = "light";
                  document.documentElement.classList.remove("dark");
                }
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
