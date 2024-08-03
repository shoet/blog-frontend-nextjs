"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutServerAction = async (_: FormData) => {
  // Cookieをクリア
  cookies().set("authToken", "", { maxAge: 0 });
  // ログイン画面にリダイレクト
  redirect("/admin/signin");
};
