import Link from "next/link";
import clsx from "clsx";
import { ComponentProps } from "react";

export const Header = async (props: ComponentProps<"div">) => {
  const { className, ...rest } = props;
  return (
    <div
      className={clsx("flex flex-row items-center justify-between", className)}
      {...rest}
    >
      <header
        className={clsx(
          "flex items-baseline justify-start gap-[20px]",
          "sm:flex-row",
          "flex-col",
        )}
      >
        <Link href="/">
          <div className={clsx("text-center")}>
            <span className={clsx("font-bold text-5xl tracking-widest")}>
              shoet
            </span>
            <span className={clsx("text-5xl tracking-widest")}>Blog</span>
          </div>
        </Link>
        <div className={clsx("text-gray-500 text-sm")}>
          技術や好きなことについて発信しています。
        </div>
      </header>
    </div>
  );
};
