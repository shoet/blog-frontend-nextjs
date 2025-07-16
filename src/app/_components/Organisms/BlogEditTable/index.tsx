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
        <div className={styles.blogTitle}>
          <Link
            href={`/blogs/${blog.id}`}
            target="_blank"
            className={styles.link}
          >
            {blog.title}
          </Link>
        </div>
      </td>
      <td>
        <div className={styles.author}>
          <div className={styles.avatarImage}>
            <AvatarImage imageURL={userProfile.avatarImageFileURL || ""} />
          </div>
          <div>{userProfile.nickname}</div>
        </div>
      </td>
      <td>
        <div className={styles.tags}>
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
        <div className={styles.isPublic}>
          <div className={styles.toggleSwitch}>
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
          className={styles.edit}
        >
          <IconEdit />
        </Link>
      </td>
      <td>
        <Link href={`/admin/blogs/${blog.id}/delete`} className={styles.delete}>
          <IconTrash />
        </Link>
      </td>
    </tr>
  );
};
