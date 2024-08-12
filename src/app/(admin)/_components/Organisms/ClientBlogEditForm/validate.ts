import { z } from "zod";

export const ClientBlogEditFormSchema = z.object({
  id: z.number({ coerce: true }).min(1, "IDが不正です"),
  user_id: z.number({ coerce: true }),
  title: z
    .string()
    .min(1, "タイトルを入力してください")
    .max(100, "タイトルは100文字以内で入力してください"),
  description: z
    .string()
    .min(1, "概要を入力してください")
    .max(1000, "概要は1000文字以内で入力してください"),
  content: z
    .string()
    .min(1, "本文を入力してください")
    .max(10000, "本文は10000文字以内で入力してください"),
  thumbnail_image_url: z
    .string()
    .min(1, "サムネイル画像をアップロードしてください"),
  is_public: z.boolean({ coerce: true }),
  tags: z.string().transform((val) => val.split(",").map((tag) => tag.trim())),
});
