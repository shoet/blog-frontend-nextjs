import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";
import { ToastProvider } from "./_components/Molecules/ToastProvider";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { APP_DESCRIPTION, APP_TITLE, OGP_INFO } from "@/constant";

const font = Inter({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  keywords: [
    "shoet",
    "ブログ",
    "blog",
    "技術ブログ",
    "tech",
    "エンジニア",
    "プログラミング",
  ],
  openGraph: {
    ...OGP_INFO,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={font.className}>
      <head>
        <Script src="/register-service-worker.js" />
      </head>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
