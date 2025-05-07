"use server";
import { getUserProfile } from "@/services/userProfile";
import { Blog } from "@/types/api";
import { AvatarImage } from "../../Molecules/AvatarImage";
import styles from "./index.module.scss";
import { Badge } from "../../Atoms/Badge";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";
import Link from "next/link";
import { ToggleSwitch } from "../../Atoms/ToggleSwitch";
import { ClientIsPublic } from "./_components/ClientIsPublic";

type Props = {
  blogs: Blog[];
};

export const BlogEditTable = async (props: Props) => {
  const { blogs } = props;
  return (
    <div className={styles.blogEditTable}>
      <table>
        <thead>
          <th>タイトル</th>
          <th>作成者</th>
          <th>タグ</th>
          <th>公開/非公開</th>
          <th>作成日時</th>
          <th>更新日時</th>
        </thead>
        <tbody>
          {blogs.map((b, idx) => {
            return <BlogEditTableRow key={idx} blog={b} />;
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
          {blog.tags?.map((tag, idx) => {
            return (
              <Badge key={idx} backgroundColor="black" color="white">
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
    </tr>
  );
};
