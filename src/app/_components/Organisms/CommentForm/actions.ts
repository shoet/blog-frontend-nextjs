"use server";

import { postComment } from "@/services/postComment";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export async function postCommentServerAction(formdata: FormData) {
  const validation = z.object({
    blogId: z.string(),
    comment: z.string(),
    clientId: z.string().optional(),
    userId: z.string().optional(),
  });
  const { data, success, error } = validation.safeParse(
    Object.fromEntries(formdata),
  );
  if (!success) {
    console.error("Invalid form data", error.format());
    throw new Error("Invalid form data");
  }
  const blogIdNum = parseInt(data.blogId);
  if (Number.isNaN(blogIdNum)) {
    console.error("Invalid blogId", data.blogId);
    throw new Error("Invalid blogId");
  }
  const userIdNum = data.userId ? parseInt(data.userId) : undefined;
  if (userIdNum && Number.isNaN(userIdNum)) {
    console.error("Invalid userId", data.userId);
    throw new Error("Invalid userId");
  }
  await postComment(blogIdNum, data.comment, userIdNum, data.clientId);
  revalidateTag("fetch_comment");
}
