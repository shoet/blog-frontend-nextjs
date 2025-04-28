import { ZodValidateError } from "@/utils/validate";

export type UserProfileEditState = {
  payload: {
    userId: number;
    avatarImageURL?: string;
    nickname?: string;
    bio?: string;
  };
  errors: string[];
  validateErrors: ZodValidateError[];
};
