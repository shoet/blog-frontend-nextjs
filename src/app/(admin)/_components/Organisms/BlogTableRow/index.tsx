import { Blog } from "@/types/api";
import { ComponentProps } from "react";
import css from "./index.module.scss";
import { Button } from "@/app/_components/Atoms/Button";
import { Badge, BadgeProps } from "@/app/_components/Atoms/Badge";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";

type BlogTableRow = {
  blog: Blog;
} & ComponentProps<"tr">;

export const BlogTableRow = (props: BlogTableRow) => {
  const { blog, ...rest } = props;

  const badgeProps: BadgeProps = blog.isPublic
    ? { color: "white", backgroundColor: "orange" }
    : { color: "black", backgroundColor: "gray" };

  return (
    <tr className={css.blogTableRow} {...rest}>
      <td className={css.id}>{blog.id}</td>
      <td className={css.title}>{blog.title}</td>
      <td className={css.createdAt}>{toStringYYYYMMDD_HHMMSS(blog.created)}</td>
      <td className={css.isPublished}>
        <Badge {...badgeProps}>{blog.isPublic ? "公開" : "非公開"}</Badge>
      </td>
      <td className={css.edit}>
        <Button variant="secondary">編集</Button>
      </td>
      <td className={css.delete}>
        <Button variant="secondary">削除</Button>
      </td>
    </tr>
  );
};
