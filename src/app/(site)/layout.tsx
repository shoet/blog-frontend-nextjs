import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { APP_DESCRIPTION, APP_TITLE } from "@/constant";
import { Header } from "../_components/Organisms/Header";
import { Footer } from "../_components/Organisms/Footer";
import { SideMenu } from "../_components/Organisms/SideMenu";
import css from "./layout.module.scss";
import clsx from "clsx";
import { Spacer } from "../_components/Atoms/Spacer";
import { TableOfContentContextProvider } from "../_components/Organisms/TableOfContentProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={clsx(inter.className, css.body)}>
      <div>
        <Spacer height={30} />
        <Header />
        <Spacer height={20} />
      </div>
      <TableOfContentContextProvider>
        <div className={css.verticalDiv}>
          <div className={css.verticalLeft}>
            <main className={css.mainArea}>{children}</main>
          </div>
          <div className={css.verticalRight}>
            <div className={css.sideMenu}>
              <SideMenu />
            </div>
          </div>
        </div>
      </TableOfContentContextProvider>
      <Spacer height={50} />
      <Footer />
      <Spacer height={100} />
    </body>
  );
}
