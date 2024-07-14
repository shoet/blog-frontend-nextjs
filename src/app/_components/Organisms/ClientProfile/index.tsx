"use client";
import Link from "next/link";
import css from "./index.module.scss";
import { IconGitHub, IconTwitter, IconYoutube } from "../../Atoms/Icon";
import { theme } from "@/themes";
import { Spacer } from "../../Atoms/Spacer";
import { CSSProperties } from "react";
import { Button } from "../../Atoms/Button";

type ProfileProps = {
  isLogin?: boolean;
  signout?: () => void;
};

export const ClientProfile = (props: ProfileProps) => {
  const { isLogin = false, signout } = props;
  const style = {
    "--name-color": isLogin ? theme.colors.focusGreen : null,
  } as CSSProperties;
  const handleClickSigntout = () => signout && signout();
  return (
    <div className={css.profile} style={style}>
      <div className={css.title}>
        <div className={css.name}>shoet</div>
        <Spacer width={10} />
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
        {isLogin && (
          <>
            <Spacer width={10} />
            <Button onClick={handleClickSigntout} variant="primary">
              Signout
            </Button>
          </>
        )}
      </div>
      <div className={css.description}>
        エンジニア。
        <br />
        エンジニアリングで価値提供できるよう、
        <br />
        日々自己研磨。
      </div>
    </div>
  );
};
