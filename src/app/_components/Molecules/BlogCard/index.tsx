import { Blog } from "@/types/api";
import styles from "./index.module.scss";
import { Badge } from "../../Atoms/Badge";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";
import Image from "next/image";
import { CSSProperties } from "react";
import { theme } from "@/themes";

type BlogCardProps = {
  blog: Blog;
};
export const BlogCard = (props: BlogCardProps) => {
  const { blog } = props;

  const style = {
    "--title-font-size": theme.fontSizes.extraExtraLarge,
    "--description-font-size": theme.fontSizes.medium,
    "--datetime-font-size": theme.fontSizes.large,
    "--datetime-font-color": "gray",
    "--border-color": theme.colors.border,
  } as CSSProperties;

  return (
    <div className={styles.blogCard} style={style}>
      <div className={styles.imageWrapper}>
        <Image
          src={blog.thumbnailImageFileName}
          alt={blog.title}
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.title}>{blog.title}</div>
        <div className={styles.tags}>
          {blog.tags?.map((t) => {
            return (
              <Badge key={t} color="white" backgroundColor="black">
                {t}
              </Badge>
            );
          })}
        </div>
        <div className={styles.description}>{blog.description}</div>
        <div className={styles.datetime}>
          {toStringYYYYMMDD_HHMMSS(blog.created)}
        </div>
      </div>
    </div>
  );
};
