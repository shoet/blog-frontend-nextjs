"use client";
import Link from "next/link";
import { IconGitHub, IconTwitter, IconYoutube } from "../../Atoms/Icon";
import { theme } from "@/themes";
import { Spacer } from "../../Atoms/Spacer";
import { Button } from "../../Atoms/Button";
import clsx from "clsx";

type ProfileProps = {
  isLogin?: boolean;
  signout?: () => void;
};

export const ClientProfile = (props: ProfileProps) => {
  const { isLogin = false, signout } = props;
  const handleClickSigntout = () => signout && signout();
  return (
    <div>
      <div className={clsx("flex flex-row items-center justify-start")}>
        <Link href="/admin">
          <div className={clsx("font-bold text-md cursor-pointer")}>shoet</div>
        </Link>
        <Spacer width={10} />
        <div className={clsx("flex flex-row items-center gap-1.5")}>
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
        {isLogin && (
          <>
            <Spacer width={10} />
            <Button onClick={handleClickSigntout} variant="primary">
              Signout
            </Button>
          </>
        )}
      </div>
      <div className={clsx("text-sm")}>
        エンジニア。
        <br />
        エンジニアリングで価値提供できるよう、
        <br />
        日々自己研鑽。
      </div>
    </div>
  );
};
