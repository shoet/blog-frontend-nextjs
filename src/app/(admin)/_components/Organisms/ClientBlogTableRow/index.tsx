"use client";
import type { Blog } from "@/types/api";
import type { ComponentProps } from "react";
import css from "./index.module.scss";
import { Button } from "@/app/_components/Atoms/Button";
import { Badge } from "@/app/_components/Atoms/Badge";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";
import Link from "next/link";

type ClientBlogTableRowProps = {
  blog: Blog;
  onClickEdit?: () => void;
  onClickDelete?: () => void;
} & ComponentProps<"tr">;

export const ClientBlogTableRow = (props: ClientBlogTableRowProps) => {
  const { blog, onClickEdit, onClickDelete, ...rest } = props;

  return (
    <tr className={css.blogTableRow} {...rest}>
      <td className={css.id}>{blog.id}</td>
      <td className={css.title}>{blog.title}</td>
      <td className={css.createdAt}>{toStringYYYYMMDD_HHMMSS(blog.created)}</td>
      <td className={css.isPublished}>
        <Badge variant={blog.isPublic ? "orange" : "black"}>{blog.isPublic ? "公開" : "非公開"}</Badge>
      </td>
      <td className={css.edit}>
        <Link href={`/admin/blogs/${blog.id}/edit`}>
          <Button variant="secondary">編集</Button>
        </Link>
      </td>
      <td className={css.delete}>
        <Link href={`/admin/blogs/${blog.id}/delete`}>
          <Button variant="secondary">削除</Button>
        </Link>
      </td>
    </tr>
  );
};
