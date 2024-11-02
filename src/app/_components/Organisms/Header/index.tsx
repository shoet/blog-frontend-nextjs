import Link from "next/link";
import css from "./index.module.scss";

export const Header = () => {
  return (
    <div className={css.headerWrapper}>
      <header className={css.header}>
        <Link href="/">
          <div className={css.title}>
            <div className={css.titleMain}>shoet</div>
            <div className={css.titleSub}>Blog</div>
          </div>
        </Link>
        <div className={css.subTitle}>
          技術や好きなことについて発信しています。
        </div>
      </header>
    </div>
  );
};
