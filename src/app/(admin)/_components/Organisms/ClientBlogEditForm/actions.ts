"use server";
import { ZodError } from "zod";
import {
  ClientBlogEditFormError,
  ClientBlogEditFormState,
  emptyFormState,
} from "./state";
import { ClientBlogEditFormSchema } from "./validate";
import { editBlog } from "@/services/editBlog";
import { getServerSideCookie } from "@/utils/cookie";
import { getUsersMe } from "@/services/getUsersMe";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function blogEditSubmitAction(
  formData: FormData,
): Promise<ClientBlogEditFormState> {
  try {
    // Validation
    const valid = ClientBlogEditFormSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    // ユーザーIDのチェック
    const token = getServerSideCookie("authToken")?.value;
    if (!token) {
      return { ...emptyFormState, generalError: "ログインしてください" };
    }
    const user = await getUsersMe(token);
    if (user.id !== valid.user_id) {
      return { ...emptyFormState, generalError: "ユーザーIDが不正です" };
    }

    const blog = await editBlog({
      id: valid.id,
      authorID: valid.user_id,
      title: valid.title,
      content: valid.content,
      description: valid.description,
      tags: valid.tags,
      thumbnailImageFileURL: valid.thumbnail_image_url,
      isPublic: valid.is_public,
    });

    // キャッシュ削除
    revalidatePath(`/admin/blogs/${blog.id}/edit`);
  } catch (e) {
    if (e instanceof ZodError) {
      const errors: ClientBlogEditFormError[] = e.errors.map((error) => {
        const field = error.path[0].toString();
        const message = error.message;
        return { field: field, error: message } as ClientBlogEditFormError;
      });
      return { ...emptyFormState, errors: errors }; // TODO: 一旦空で返す
    } else {
      throw e;
    }
  }
  redirect("/admin");
}
