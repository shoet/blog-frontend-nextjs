import { CSSProperties } from "react";
import { Button } from "../../Atoms/Button";
import styles from "./index.module.scss";
import { theme } from "@/themes";
import { AvatarImage } from "../AvatarImage";

type Props = {
  avatarImageURL?: string;
  nickname?: string;
  bio?: string;
};

export const UserProfileForm = (props: Props) => {
  const { avatarImageURL = "/avatar_default.png" } = props;
  const style = {
    "--title-color": theme.colors.black,
    "--border-color": theme.colors.borderDark,
    "--editor-background-color": theme.colors.secondaryDark,
  } as CSSProperties;

  return (
    <div>
      <div className={styles.userProfile} style={style}>
        <div className={styles.avatar}>
          <div className={styles.avatarInner}>
            <AvatarImage imageURL={avatarImageURL} />
          </div>
          <button className={styles.avatarChangeButton}>変更する</button>
        </div>
        <div className={styles.editor}>
          <div>
            <div className={styles.title}>表示名</div>
            <input placeholder="表示名を入力" />
          </div>
          <div>
            <div className={styles.title}>自己紹介</div>
            <textarea placeholder="自己紹介を入力" />
          </div>
          <div className={styles.sender}>
            <Button variant="secondaryDark">更新する</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
