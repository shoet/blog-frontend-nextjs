import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";
import { ToastProvider } from "./_components/Molecules/ToastProvider";
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"], weight: "500" });

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
