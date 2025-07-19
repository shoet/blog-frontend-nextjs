import type { ComponentProps } from "react";
import clsx from "clsx";
import Link from "next/link";

export type NavigationItem = {
  title: string;
  href: string;
};

type NavigationProps = { items: NavigationItem[] } & ComponentProps<"nav">;

export const Navigation = (props: NavigationProps) => {
  const { items, ...rest } = props;

  return (
    <nav className={clsx(
      "flex flex-row items-center justify-center"
    )}
      {...rest}
    >
      {
        items.map((i, idx) => {
          return (
            <Link
              href={i.href}
              key={i.title}
              className={clsx(
                "px-2 hover:text-gray-400",
                idx !== items.length - 1 && "border-r border-r-black border-solid",
              )}>{i.title}</Link>
          )
        })
      }
    </nav>
  )

}
