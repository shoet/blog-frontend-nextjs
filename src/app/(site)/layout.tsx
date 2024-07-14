import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { APP_DESCRIPTION, APP_TITLE } from "@/constant";
import { Header } from "../_components/Organisms/Header";
import { Footer } from "../_components/Organisms/Footer";
import { SideMenu } from "../_components/Organisms/SideMenu";
import css from "./layout.module.scss";
import {
  Navigation,
  NavigationItem,
} from "../_components/Molecules/Navigation";
import clsx from "clsx";
import { Spacer } from "../_components/Atoms/Spacer";

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
  const navigationItems: NavigationItem[] = [
    { href: "/blogs", title: "Blog" },
    { href: "/portfolio", title: "Portfolio" },
    { href: "/about", title: "About" },
  ];
  return (
    <html lang="en">
      <body className={clsx(inter.className, css.body)}>
        <div>
          <Spacer height={10} />
          <Header />
          <Spacer height={10} />
          <div className={css.navigationArea}>
            <Navigation items={navigationItems} />
          </div>
          <Spacer height={20} />
        </div>
        <div className={css.verticalDiv}>
          <div className={css.verticalLeft}>
            <main className={css.mainArea}>{children}</main>
          </div>
          <div className={css.verticalRight}>
            <SideMenu>
              <div>SideA</div>
              <div>SideA</div>
              <div>SideA</div>
            </SideMenu>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
