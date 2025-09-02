import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Header } from "../_components/Organisms/Header";
import { Footer } from "../_components/Organisms/Footer";
import { SideMenu } from "../_components/Organisms/SideMenu";
import css from "./layout.module.scss";
import clsx from "clsx";
import { Spacer } from "../_components/Atoms/Spacer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className={clsx(css.body)}>
        <div>
          <Spacer height={30} />
          <Header />
          <Spacer height={20} />
        </div>
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
      </div>
      <Spacer height={50} />
      <Footer />
    </div>
  );
}
