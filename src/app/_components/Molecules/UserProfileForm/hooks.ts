"use client";

import { useActionState } from "react";
import { userProfileEditStateAction } from "./actions";

export const useUserProfileEdit = (props: {
  userId: number;
  avatarImageURL?: string;
  nickname?: string;
  bio?: string;
}) => {
  const { userId, avatarImageURL, nickname, bio } = props;
  const [state, serverAction, isLoading] = useActionState(
    userProfileEditStateAction,
    {
      payload: { userId, avatarImageURL, nickname, bio },
    },
  );
  return {
    ...state.payload,
    isLoading,
    errors: state.errors,
    validateErrors: state.validateErrors,
    action: serverAction,
  };
};
