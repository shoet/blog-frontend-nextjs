"use client";
import { CSSProperties } from "react";
import { Button } from "../../Atoms/Button";
import styles from "./index.module.scss";
import { theme } from "@/themes";
import { AvatarImage } from "../AvatarImage";
import { useUserProfileEdit } from "./hooks";

type Props = {
  avatarImageURL?: string;
  nickname?: string;
  bio?: string;
};

export const UserProfileForm = (props: Props) => {
  const defaultAvatarImageURL = "/avatar_default.png";

  const { avatarImageURL, nickname, bio, errors, validateErrors, action } =
    useUserProfileEdit({ ...props });

  const style = {
    "--title-color": theme.colors.black,
    "--border-color": theme.colors.borderDark,
    "--editor-background-color": theme.colors.secondaryDark,
  } as CSSProperties;

  return (
    <form action={action}>
      <div className={styles.userProfile} style={style}>
        <div className={styles.avatar}>
          <div className={styles.avatarInner}>
            <AvatarImage imageURL={avatarImageURL || defaultAvatarImageURL} />
            <input hidden name="avatarImageURL" defaultValue={avatarImageURL} />
          </div>
          <button className={styles.avatarChangeButton}>変更する</button>
        </div>
        <div className={styles.editor}>
          <div>
            <div className={styles.title}>表示名</div>
            <input
              name="nickname"
              defaultValue={nickname}
              placeholder="表示名を入力"
            />
          </div>
          <div>
            <div className={styles.title}>自己紹介</div>
            <textarea
              name="bio"
              defaultValue={bio}
              placeholder="自己紹介を入力"
            />
          </div>
          <div className={styles.sender}>
            <Button type="submit" variant="secondaryDark">
              更新する
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
