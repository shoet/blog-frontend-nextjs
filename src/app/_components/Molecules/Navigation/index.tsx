import Link from "next/link";
import { ComponentProps } from "react";
import css from "./index.module.scss";
import { Divider } from "../../Atoms/Divider";

export type NavigationItem = {
  title: string;
  href: string;
};

type NavigationProps = { items: NavigationItem[] } & ComponentProps<"nav">;

export const Navigation = (props: NavigationProps) => {
  const { items, ...rest } = props;
  return (
    <nav className={css.navigation} {...rest}>
      <div className={css.navigationItems}>
        {items.map((i, idx) => {
          return (
            <>
              <div key={i.title} className={css.navigationItem}>
                <Link href={i.href}>{i.title}</Link>
              </div>
              {idx !== items.length - 1 && <Divider />}
            </>
          );
        })}
      </div>
    </nav>
  );
};
