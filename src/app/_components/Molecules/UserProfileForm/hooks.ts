"use client";

import { useActionState, useRef, useState } from "react";
import { userProfileEditStateAction } from "./actions";
import { ZodValidateError } from "@/utils/validate";
import { getUploadURL } from "@/services/uploadFile";

const useAvatarImage = (props: { avatarImageURL?: string }) => {
  const [avatarImageURL, setAvataImageURL] = useState<string | undefined>(
    props.avatarImageURL,
  );
  const [tmpImageURL, setTmpImageURL] = useState<string>();
  const [avatarImageValidateError, setAvataImageValidateError] =
    useState<ZodValidateError>();
  const avatarImageInputRef = useRef<HTMLInputElement>(null);
  const avatarImageClick = () => {
    if (avatarImageInputRef.current == null) return;
    avatarImageInputRef.current.click();
  };
  const avatarImageOnChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files === null) {
      return;
    }
    if (e.target.files.length > 1) {
      return;
    }
    const file = e.target.files.item(0);
    if (file === null) {
      return;
    }
    try {
      getUploadURL(file, "avatar_image").then(({ destinationUrl }) => {
        if (tmpImageURL) {
          URL.revokeObjectURL(tmpImageURL);
          setTmpImageURL(undefined);
        }
        setAvataImageURL(destinationUrl);
      });
      const newBlob = new Blob([file], { type: file.type });
      const tmpURL = URL.createObjectURL(newBlob);
      setTmpImageURL(tmpURL);
      setAvataImageURL(tmpURL);
    } catch (err) {
      console.log(err);
      setAvataImageValidateError({
        field: "avatarImageUrl",
        error: "画像のアップロードに失敗しました。",
      });
    }
  };

  return {
    isLoading: tmpImageURL != undefined,
    avatarImageURL,
    avatarImageInputRef,
    avatarImageClick,
    avatarImageOnChange,
    avatarImageValidateError,
  };
};

export const useUserProfileEdit = (props: {
  userId: number;
  avatarImageURL?: string;
  nickname?: string;
  bio?: string;
}) => {
  const {
    userId,
    avatarImageURL: defaultAvatarImageURL,
    nickname,
    bio,
  } = props;

  const [state, serverAction, isLoading] = useActionState(
    userProfileEditStateAction,
    {
      payload: { userId, avatarImageURL: defaultAvatarImageURL, nickname, bio },
      validateErrors: [],
      errors: [],
    },
  );

  const {
    isLoading: avatarImageURLLoading,
    avatarImageURL,
    avatarImageInputRef,
    avatarImageClick,
    avatarImageOnChange,
    avatarImageValidateError,
  } = useAvatarImage({ avatarImageURL: state.payload.avatarImageURL });

  const validateErrors: ZodValidateError[] = [...state.validateErrors];
  if (avatarImageValidateError) {
    validateErrors.push(avatarImageValidateError);
  }

  return {
    ...state.payload,
    avatarImageURL,
    isLoading: isLoading || avatarImageURLLoading,
    errors: state.errors,
    validateErrors: validateErrors,
    action: serverAction,
    avatarImageInputRef,
    avatarImageClick,
    avatarImageOnChange,
  };
};
