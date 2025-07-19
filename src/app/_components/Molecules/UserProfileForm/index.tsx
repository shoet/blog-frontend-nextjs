"use client";
import type React from "react";
import { Button } from "../../Atoms/Button";
import { AvatarImage } from "../AvatarImage";
import { useUserProfileEdit } from "./hooks";
import { getZodValidateError, type ZodValidateError } from "@/utils/validate";
import clsx from "clsx";

type Props = {
  userId: number;
  avatarImageURL?: string;
  nickname?: string;
  bio?: string;
};

export const UserProfileForm = (props: Props) => {
  const {
    userId,
    avatarImageURL,
    nickname,
    bio,
    isLoading,
    errors = [],
    validateErrors,
    action,
    avatarImageInputRef,
    avatarImageClick,
    avatarImageOnChange,
  } = useUserProfileEdit({ ...props });

  return (
    <form action={action}>
      {errors.length > 0 && (
        <div className={clsx(
          "mb-[20px] rounded-sm bg-[#fff1f1] px-2 py-1 text-[#ff0f0f] text-sm",
        )}>プロフィールの更新に失敗しました。</div>
      )}
      <input hidden name="userId" value={userId} />
      <UserProfileFormPresenter
        avatarImageURL={avatarImageURL}
        nickname={nickname}
        bio={bio}
        isLoading={isLoading}
        validateErrors={validateErrors}
        avatarImageInputRef={avatarImageInputRef}
        avatarImageClick={avatarImageClick}
        avatarImageOnChange={avatarImageOnChange}
      />
    </form>
  );
};

export const UserProfileFormPresenter = (props: {
  nickname?: string;
  avatarImageURL?: string;
  bio?: string;
  isLoading?: boolean;
  validateErrors: ZodValidateError[];
  avatarImageInputRef?: React.RefObject<HTMLInputElement | null>;
  avatarImageClick?: () => void;
  avatarImageOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const defaultAvatarImageURL = "/avatar_default.png";
  const {
    nickname,
    avatarImageURL = defaultAvatarImageURL,
    bio,
    isLoading,
    validateErrors = [],
    avatarImageInputRef,
    avatarImageClick,
    avatarImageOnChange,
  } = props;

  const nicknameError = getZodValidateError(validateErrors, "nickname");

  const labelClass = `
    font-bold text-md text-black
  `
  const textInputClass = `
    w-full rounded-md bg-[#dfe6da]
    p-2 text-md outline-none placeholder:text-gray-400
  `

  const errorTextClass = `
    text-sm text-red-500
  `

  return (
    <div className={clsx(
      "grid grid-cols-[1fr_3fr]",
    )}>
      <div className={clsx(
        "flex flex-col items-center justify-start gap-[10px]",
        "cursor-pointer pr-[20px]",
      )}>
        <AvatarImage
          imageURL={avatarImageURL}
          onClick={() => avatarImageClick?.()}
        />
        <button
          type="button"
          className={clsx(
            "cursor-pointer text-[#919191] text-md hover:brightness-[0.7]",
          )}
          onClick={() => avatarImageClick?.()}
        >
          変更する
        </button>
        <input hidden type="file" ref={avatarImageInputRef} onChange={avatarImageOnChange} />
        <input hidden value={avatarImageURL} name="avatarImageURL" />
      </div>
      <div className={clsx(
        "flex flex-col gap-[20px]"
      )}>
        <div>
          <div className={clsx(labelClass)}>表示名</div>
          <input
            name="nickname"
            defaultValue={nickname}
            placeholder="表示名を入力"
            className={clsx(textInputClass,)}
          />
          {nicknameError && (
            <div className={clsx(errorTextClass)}>{nicknameError.error}</div>
          )}
        </div>
        <div>
          <div className={clsx(labelClass)}>自己紹介</div>
          <textarea
            name="bio"
            defaultValue={bio}
            placeholder="自己紹介を入力"
            className={clsx(
              textInputClass,
              "field-sizing-content min-h-[100px] resize-none",
            )}
          />
        </div>
        <div className={clsx(
          "mt-[20px] flex flex-row justify-end"
        )}>
          <Button type="submit" variant="secondaryDark" disabled={isLoading}>
            更新する
          </Button>
        </div>
      </div>
    </div>
  );
};
