import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <Script src="/register-service-worker.js" />
      </head>
      {children}
    </html>
  );
}
