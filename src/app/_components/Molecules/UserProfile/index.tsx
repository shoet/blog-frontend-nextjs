import type { CSSProperties } from "react";
import { AvatarImage } from "../AvatarImage";
import styles from "./index.module.scss";
import { theme } from "@/themes";
import type { UserProfile as UserProfileType } from "@/types/api";
import Link from "next/link";

type Props = {
  userProfile: UserProfileType;
  showEdit?: boolean;
};

export const UserProfile = (props: Props) => {
  const { userId, nickname, avatarImageFileURL, bio } = props.userProfile;
  const { showEdit = false } = props;

  const style = {
    "--background-color": theme.colors.secondaryDark,
  } as CSSProperties;

  return (
    <div className={styles.userProfile} style={style}>
      <div className={styles.avatar}>
        <AvatarImage imageURL={avatarImageFileURL || "/avatar_default.png"} />
      </div>
      <div className={styles.profile}>
        <div className={styles.title}>
          <span className={styles.nickname}>{nickname}</span>
          {showEdit && (
            <Link
              className={styles.editButton}
              href={`/${userId}/profile/edit`}
            >
              編集する
            </Link>
          )}
        </div>
        <div className={styles.biography}>{bio}</div>
      </div>
    </div>
  );
};
