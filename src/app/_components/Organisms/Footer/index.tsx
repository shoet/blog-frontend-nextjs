import { theme } from "@/themes";
import { IconGitHub, IconTwitter, IconYoutube } from "../../Atoms/Icon";
import Link from "next/link";
import type { CSSProperties } from "react";
import clsx from "clsx";
export const Footer = () => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center",
        "h-[300px] bg-[var(--background-color)] p-4",
      )}
      style={
        {
          "--background-color": theme.colors.secondaryGray,
        } as CSSProperties
      }
    >
      <div className={clsx("flex flex-col items-center justify-center")}>
        <div
          className={clsx("flex flex-row items-center justify-center gap-6")}
        >
          <Link href="https://github.com/shoet" target="_blank">
            <IconGitHub focus focusColor={theme.colors.focusGreen} />
          </Link>
          <Link href="https://twitter.com/sHOeTS_u" target="_blank">
            <IconTwitter focus focusColor={theme.colors.focusGreen} />
          </Link>
          <Link
            href="https://www.youtube.com/@shoetsu9505/videos"
            target="_blank"
          >
            <IconYoutube focus focusColor={theme.colors.focusGreen} />
          </Link>
        </div>
        <div className={clsx("mt-4 text-sm")}>
          &copy;{` ${new Date().getFullYear()} shoet. All rights reserved.`}
        </div>
      </div>
    </div>
  );
};
