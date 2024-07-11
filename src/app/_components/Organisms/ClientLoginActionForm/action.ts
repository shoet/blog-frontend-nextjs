"use server";
import { z } from "zod";
import { LoginActionFormState } from "./state";
import { assertZodSchema, getZodValidateErrors } from "@/utils/validate";
import { login } from "@/services/login";
import { cookies } from "next/headers";

export async function loginServerAction(
  formData: FormData,
): Promise<LoginActionFormState> {
  const validateType = z.object({
    email: z.string().min(1, "メールアドレスを入力してください"),
    password: z.string().min(1, "パスワードを入力してください"),
  });

  try {
    const data = Object.fromEntries(formData);
    assertZodSchema(validateType, data);
    const { email, password } = data;
    const response = await login(email, password);
    // Cookieをセットする
    cookies().set("authToken", response.authToken);
    return {};
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { validateErrors: getZodValidateErrors(e) };
    }
    console.warn(e);
    throw new Error("予期せぬエラーが発生しました");
  }
}
