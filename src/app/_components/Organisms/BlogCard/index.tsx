import type { Blog } from "@/types/api";
import { Badge } from "../../Atoms/Badge";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";
import { LoadingNextImage } from "../../Molecules/LoadingNextImage";
import clsx from "clsx";

type BlogCardProps = {
  blog: Blog;
};

export const BlogCard = (props: BlogCardProps) => {
  const { blog } = props;

  return (
    <div
      className={clsx(
        "p-4 flex gap-4",
        "sm:flex-row sm:items-center sm:justify-start",
        "flex-col ",
        "border border-gray-200 rounded-xl",
      )}
    >
      <div className={clsx("min-w-[200px] min-h-[150px] relative shrink-0")}>
        <LoadingNextImage
          src={blog.thumbnailImageFileName}
          alt={blog.title}
          fill
          className={clsx(
            "relative object-center object-contain w-full h-full",
          )}
        />
      </div>
      <div className={clsx("min-w-0 flex-1 break-words")}>
        <div className={clsx("text-2xl font-bold")}>{blog.title}</div>
        <div className={clsx("flex flex-col gap-2 mt-6")}>
          <div
            className={clsx(
              "flex flex-row items-center justify-start gap-1",
              " flex-wrap",
            )}
          >
            {blog.tags?.map((t) => (
              <Badge key={t} variant="black">
                {t}
              </Badge>
            ))}
          </div>
          <div className={clsx("text-md")}>{blog.description}</div>
          <div className={clsx("text-sm font-bold text-gray-500")}>
            {toStringYYYYMMDD_HHMMSS(blog.created)}
          </div>
        </div>
      </div>
    </div>
  );
};
