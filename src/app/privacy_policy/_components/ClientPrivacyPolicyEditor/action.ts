"use server";

import { getZodValidateErrorsV4 } from "@/utils/validate";
import type { State } from "./state";
import { z } from "zod/v4";
import {
  deletePrivacyPolicy,
  editPrivacyPolicy,
} from "@/services/privacyPolicy";
import { redirect } from "next/navigation";

export const editFormAction = async (
  _: State,
  formData: FormData,
): Promise<State> => {
  const schema = z.object({
    name: z.string().min(1, "タイトルの指定は必須です"),
    content: z.string().min(1, "記事の指定は必須です"),
  });
  const { success, data, error } = schema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    const validateErrors = getZodValidateErrorsV4(error);
    return {
      statusCode: 400,
      zodError: validateErrors,
    };
  }
  try {
    await editPrivacyPolicy(data.name, data.content);
  } catch (e) {
    console.error("failed to edit privacy policy", e);
    return {
      statusCode: 500,
      message: "エラーが発生しました",
    };
  }
  return redirect(`/privacy_policy/${data.name}`);
};

export const deleteFormAction = async (
  prevState: State,
  formData: FormData,
) => {
  const schema = z.object({
    name: z.string().min(1, "タイトルの指定は必須です"),
  });
  const { success, data, error } = schema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    const validateErrors = getZodValidateErrorsV4(error);
    return {
      statusCode: 400,
      zodError: validateErrors,
    };
  }
  try {
    await deletePrivacyPolicy(data.name);
  } catch (e) {
    console.error("failed to delete privacy policy", e);
    return {
      statusCode: 500,
      message: "プライバシーポリシーの削除に失敗しました",
    };
  }
  return redirect(`/admin`);
};
