"use client";

import { useActionState } from "react";
import { userProfileEditAction } from "./actions";

export type UserProfileEditState = {
  payload: {
    avatarImageURL?: string;
    nickname?: string;
    bio?: string;
  };
  errors?: string[];
  validateErrors?: string[];
};

export const useUserProfileEdit = (props: {
  avatarImageURL?: string;
  nickname?: string;
  bio?: string;
}) => {
  const { avatarImageURL, nickname, bio } = props;
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
    { payload: { avatarImageURL, nickname, bio } },
  );

  return {
    ...state.payload,
    errors: state.errors,
    validateErrors: state.validateErrors,
    action: serverAction,
  };
};
