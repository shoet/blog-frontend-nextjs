"use server";
import { getUserProfile } from "@/services/userProfile";
import type { Blog } from "@/types/api";
import { AvatarImage } from "../../Molecules/AvatarImage";
import styles from "./index.module.scss";
import { Badge } from "../../Atoms/Badge";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";
import Link from "next/link";
import { ClientIsPublic } from "./_components/ClientIsPublic";
import { IconEdit, IconTrash } from "../../Atoms/Icon";
import clsx from "clsx";

type Props = {
  blogs: Blog[];
};

export const BlogEditTable = async (props: Props) => {
  const { blogs } = props;
  return (
    <div className={styles.blogEditTable}>
      <table>
        <thead>
          <tr>
            <th>タイトル</th>
            <th>作成者</th>
            <th>タグ</th>
            <th>公開/非公開</th>
            <th>作成日時</th>
            <th>更新日時</th>
            <th>編集</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b) => {
            return <BlogEditTableRow key={b.id} blog={b} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

const BlogEditTableRow = async (props: { blog: Blog }) => {
  const { blog } = props;
  const userProfile = await getUserProfile(blog.authorId);
  return (
    <tr className={styles.blogEditTableRow}>
      <td>
        <Link
          href={`/blogs/${blog.id}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          {blog.title}
        </Link>
      </td>
      <td>
        <div className={clsx("flex flex-row items-center gap-2")}>
          <div className={clsx("h-[20px] w-[20px]")}>
            <AvatarImage imageURL={userProfile.avatarImageFileURL || ""} />
          </div>
          <div>{userProfile.nickname}</div>
        </div>
      </td>
      <td>
        <div className={clsx("flex flex-row flex-wrap items-center gap-1")}>
          {blog.tags?.map((tag) => {
            return (
              <Badge key={tag} variant="black">
                {tag}
              </Badge>
            );
          })}
        </div>
      </td>
      <td>
        <div className={clsx("flex items-center justify-center")}>
          <div className={clsx("w-[50px]")}>
            <ClientIsPublic blog={blog} />
          </div>
        </div>
      </td>
      <td>{toStringYYYYMMDD_HHMMSS(blog.created)}</td>
      <td>{toStringYYYYMMDD_HHMMSS(blog.modified)}</td>
      <td>
        <Link
          href={`/admin/blogs/${blog.id}/edit`}
          target="_blank"
          className={clsx(
            "flex cursor-pointer items-center justify-center hover:text-gray-500",
          )}
        >
          <IconEdit />
        </Link>
      </td>
      <td>
        <Link
          href={`/admin/blogs/${blog.id}/delete`}
          className={clsx(
            "flex cursor-pointer items-center justify-center hover:text-gray-500",
          )}
        >
          <IconTrash />
        </Link>
      </td>
    </tr>
  );
};
