import Link from "next/link";
import clsx from "clsx";

export const Header = async () => {
  return (
    <div className={clsx("flex flex-row justify-between items-center")}>
      <header
        className={clsx(
          "flex items-baseline justify-start gap-[20px]",
          "sm:flex-row",
          "flex-col",
        )}
      >
        <Link href="/">
          <div className={clsx("text-center")}>
            <span className={clsx("text-5xl font-bold tracking-widest")}>
              shoet
            </span>
            <span className={clsx("text-5xl tracking-widest")}>Blog</span>
          </div>
        </Link>
        <div className={clsx("text-sm text-gray-500")}>
          技術や好きなことについて発信しています。
        </div>
      </header>
    </div>
  );
};
