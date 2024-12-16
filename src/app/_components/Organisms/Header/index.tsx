import Link from "next/link";
import css from "./index.module.scss";

export const Header = () => {
  return (
    <div className={css.headerWrapper}>
      <header className={css.header}>
        <Link href="/">
          <div className={css.title}>
            <span className={css.titleMain}>shoet</span>
            <span className={css.titleSub}>Blog</span>
          </div>
        </Link>
        <div className={css.subTitle}>
          技術や好きなことについて発信しています。
        </div>
      </header>
    </div>
  );
};
