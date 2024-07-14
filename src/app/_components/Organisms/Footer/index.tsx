import { theme } from "@/themes";
import { IconGitHub, IconTwitter, IconYoutube } from "../../Atoms/Icon";
import css from "./index.module.scss";
import Link from "next/link";
export const Footer = () => {
  return (
    <div className={css.footer}>
      <div className={css.icons}>
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
      <div className={css.copyright}>
        &copy;{` ${new Date().getFullYear()} shoet. All rights reserved.`}
      </div>
    </div>
  );
};
