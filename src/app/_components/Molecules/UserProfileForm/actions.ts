"use server";

import { getZodValidateErrors } from "@/utils/validate";
import { redirect } from "next/navigation";
import { z } from "zod";
import type { UserProfileEditState } from "./state";
import { updateUserProfile } from "@/services/userProfile";

export const userProfileEditStateAction = async (
  prevState: UserProfileEditState,
  formData: FormData,
): Promise<UserProfileEditState> => {
  try {
    const validate = z.object({
      userId: z.string().optional(),
      nickname: z.string().min(1, "表示名は必須です。"),
      avatarImageURL: z.string().optional(),
      bio: z.string().optional(),
    });
    const { success, data, error } = validate.safeParse(
      Object.fromEntries(formData),
    );
    if (!success) {
      const validateErrors = getZodValidateErrors(error);
      console.log(error);
      return {
        payload: prevState.payload,
        validateErrors: validateErrors,
        errors: [],
      };
    }
    const { userId, nickname, avatarImageURL, bio } = data;
    if (!userId) {
      console.error("UserID is not set");
      return {
        payload: prevState.payload,
        validateErrors: [],
        errors: ["submit error"],
      };
    }
    const userIdNum = Number(userId);
    if (Number.isNaN(userIdNum)) {
      console.error("invalid UserID");
      return {
        payload: prevState.payload,
        validateErrors: [],
        errors: ["submit error"],
      };
    }
    await updateUserProfile(userIdNum, { nickname, avatarImageURL, bio });
  } catch (err) {
    console.error("faild to user profile edit", err);
    return {
      payload: prevState.payload,
      validateErrors: [],
      errors: ["submit error"],
    };
  }
  redirect(`/${prevState.payload.userId}/profile`);
};
