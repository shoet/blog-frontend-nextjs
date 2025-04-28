import { CSSProperties } from "react";
import { AvatarImage } from "../AvatarImage";
import styles from "./index.module.scss";
import { theme } from "@/themes";
import { UserProfile as UserProfileType } from "@/types/api";
import Link from "next/link";

type Props = {
  userProfile: UserProfileType;
};

export const UserProfile = (props: Props) => {
  const { userId, nickname, avatarImageURL, bio } = props.userProfile;

  const style = {
    "--background-color": theme.colors.secondaryDark,
  } as CSSProperties;

  return (
    <div className={styles.userProfile} style={style}>
      <div className={styles.avatar}>
        <AvatarImage imageURL={avatarImageURL || "/avatar_default.png"} />
      </div>
      <div className={styles.profile}>
        <div className={styles.title}>
          <span className={styles.nickname}>{nickname}</span>
          <Link className={styles.editButton} href={`/${userId}/profile/edit`}>
            編集する
          </Link>
        </div>
        <div className={styles.biography}>{bio}</div>
      </div>
    </div>
  );
};
