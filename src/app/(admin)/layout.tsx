import type { Metadata } from "next";
import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { APP_DESCRIPTION, APP_TITLE } from "@/constant";
import { Header } from "./_components/Organisms/Header";

export const metadata: Metadata = {
  title: `${APP_TITLE}【Admin】`,
  description: `${APP_DESCRIPTION}`,
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      {modal}
    </div>
  );
}
