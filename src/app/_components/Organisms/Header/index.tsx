import css from "./index.module.scss";

export const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.title}>
        <div className={css.titleMain}>shoet</div>
        <div className={css.titleSub}>Blog</div>
      </div>
      <div className={css.subTitle}>
        技術や好きなことについて発信しています。
      </div>
    </header>
  );
};
