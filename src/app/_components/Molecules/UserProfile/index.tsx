import type { CSSProperties } from "react";
import { AvatarImage } from "../AvatarImage";
import { theme } from "@/themes";
import type { UserProfile as UserProfileType } from "@/types/api";
import Link from "next/link";
import clsx from "clsx";

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
    <div className={clsx(
      "grid grid-cols-[2fr_8fr] p-2"
    )} style={style}>
      <div className={clsx(
        "pr-[30px] pb-[30px]",
      )}>
        <AvatarImage imageURL={avatarImageFileURL || "/avatar_default.png"} />
      </div>
      <div className={clsx(
        "flex flex-col gap-[20px]",
      )}>
        <div className={clsx(
          "flex flex-row items-center justify-between",
        )}>
          <span className={clsx(
            "font-bold text-2xl",
          )}>{nickname}</span>
          {showEdit && (
            <Link
              className={clsx(
                "cursor-pointer px-2 py-0.5",
                "rounded-full border border-[#dfe6da] border-solid",
                "hover:bg-[#cbd5c0]",
              )}
              href={`/${userId}/profile/edit`}
            >
              編集する
            </Link>
          )}
        </div>
        <div className={"text-sm"}>{bio}</div>
      </div>
    </div>
  );
};
