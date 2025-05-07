"use server";

import { updatePublicStatus } from "@/services/updatePublicStatus";
import { z } from "zod";

export async function updateIsPublicServerAction(formData: FormData) {
  const validator = z.object({
    blogId: z.string(),
    isPublic: z.enum(["true", "false"]),
  });

  const { success, data, error } = validator.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!success) {
    console.error("Validation error:", error.format());
    throw new Error("Validation error");
  }
  const isPublic = data.isPublic === "true";
  const blogId = parseInt(data.blogId, 10);
  if (isNaN(blogId)) {
    throw new Error("Invalid blog ID");
  }
  await updatePublicStatus(blogId, isPublic);
}
