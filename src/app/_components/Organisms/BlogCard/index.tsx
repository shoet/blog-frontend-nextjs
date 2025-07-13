import type { Blog } from "@/types/api";
import styles from "./index.module.scss";
import { Badge } from "../../Atoms/Badge";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";
import type { CSSProperties } from "react";
import { theme } from "@/themes";
import { Spacer } from "../../Atoms/Spacer";
import { LoadingNextImage } from "../../Molecules/LoadingNextImage";

type BlogCardProps = {
  blog: Blog;
};
export const BlogCard = (props: BlogCardProps) => {
  const { blog } = props;

  const style = {
    "--title-font-size": theme.fontSizes.extraExtraLarge,
    "--description-font-size": theme.fontSizes.medium,
    "--datetime-font-size": theme.fontSizes.medium,
    "--datetime-font-color": theme.colors.gray,
    "--border-color": theme.colors.border,
  } as CSSProperties;

  return (
    <div className={styles.blogCard} style={style}>
      <div className={styles.imageWrapper}>
        <LoadingNextImage
          src={blog.thumbnailImageFileName}
          alt={blog.title}
          fill
          className={styles.image}
        />
      </div>
      <Spacer width={20} />
      <div className={styles.contentWrapper}>
        <div className={styles.title}>{blog.title}</div>
        <Spacer height={15} />
        <div className={styles.tags}>
          {blog.tags?.map((t) => {
            return (
              <Badge key={t} variant="black">
                {t}
              </Badge>
            );
          })}
        </div>
        <Spacer height={15} />
        <div className={styles.description}>{blog.description}</div>
        <Spacer height={15} />
        <div className={styles.datetime}>
          {toStringYYYYMMDD_HHMMSS(blog.created)}
        </div>
      </div>
    </div>
  );
};
