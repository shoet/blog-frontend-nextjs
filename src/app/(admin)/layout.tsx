import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { APP_DESCRIPTION, APP_TITLE } from "@/constant";
import { Header } from "./_components/Organisms/Header";
import { getServerSideCookie } from "@/utils/cookie";
import { getUsersMe } from "@/services/getUsersMe";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APP_TITLE}【Admin】`,
  description: `${APP_DESCRIPTION}`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authToken = getServerSideCookie("authToken");
  if (!authToken) {
    return null;
  }
  const user = await getUsersMe(authToken.value);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header user={user} />
        {children}
      </body>
    </html>
  );
}
