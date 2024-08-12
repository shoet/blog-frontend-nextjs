import { Navigation, NavigationItem } from "../../Molecules/Navigation";
import css from "./index.module.scss";

export const Header = () => {
  const navigationItems: NavigationItem[] = [
    { href: "/blogs", title: "Blog" },
    { href: "/portfolio", title: "Portfolio" },
    { href: "/about", title: "About" },
  ];
  return (
    <div className={css.headerWrapper}>
      <header className={css.header}>
        <div className={css.title}>
          <div className={css.titleMain}>shoet</div>
          <div className={css.titleSub}>Blog</div>
        </div>
        <div className={css.subTitle}>
          技術や好きなことについて発信しています。
        </div>
      </header>
      <Navigation className={css.navigation} items={navigationItems} />
    </div>
  );
};
