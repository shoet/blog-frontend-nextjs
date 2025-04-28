"use client";

import { useActionState } from "react";
import { userProfileEditAction } from "./actions";

export type UserProfileEditState = {
  payload: {
    userId: number;
    avatarImageURL?: string;
    nickname?: string;
    bio?: string;
  };
  errors?: string[];
  validateErrors?: string[];
};

export const useUserProfileEdit = (props: {
  userId: number;
  avatarImageURL?: string;
  nickname?: string;
  bio?: string;
}) => {
  const { userId, avatarImageURL, nickname, bio } = props;
  const [state, serverAction] = useActionState(
    async (
      state: UserProfileEditState,
      formData: FormData,
    ): Promise<UserProfileEditState> => {
      try {
        await userProfileEditAction(formData);
        return { payload: state.payload };
      } catch {
        return { payload: state.payload, errors: ["submit error"] };
      }
    },
    { payload: { userId, avatarImageURL, nickname, bio } },
  );

  return {
    ...state.payload,
    errors: state.errors,
    validateErrors: state.validateErrors,
    action: serverAction,
  };
};
