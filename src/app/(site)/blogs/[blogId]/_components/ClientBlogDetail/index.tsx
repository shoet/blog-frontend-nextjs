"use client";

import { Blog } from "@/types/api";
import css from "./index.module.scss";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";
import { Badge } from "@/app/_components/Atoms/Badge";
import { Divider } from "@/app/_components/Atoms/Divider";
import { CommentForm } from "@/app/_components/Organisms/CommentForm";
import { useTableOfContentContext } from "@/app/_components/Organisms/TableOfContentProvider";
import { useEffect } from "react";
import { MarkdownRenderer } from "@/app/_components/Molecules/MarkdownRenderer";

export const ClientBlogDetail = (props: { blog: Blog }) => {
  const { blog } = props;
  const { loadHeadings, cleanupHeadings, watchRef } =
    useTableOfContentContext();

  useEffect(() => {
    return () => {
      cleanupHeadings();
    };
  }, []);

  const onEndLoadMarkdown = () => {
    loadHeadings();
  };

  return (
    <div>
      <div className={css.title}>{blog.title}</div>
      <Spacer height={20} />
      <div className={css.descriptionArea}>
        <div className={css.date}>{toStringYYYYMMDD_HHMMSS(blog.created)}</div>
        <Spacer width={20} />
        {blog.tags && (
          <div className={css.tags}>
            {blog.tags.map((tag) => {
              return <Badge key={tag}>{tag}</Badge>;
            })}
          </div>
        )}
      </div>
      <Spacer height={20} />
      <div className={css.imageWrapper}>
        <img
          className={css.image}
          src={blog.thumbnailImageFileName}
          alt={blog.title}
        />
      </div>
      <Spacer height={20} />
      <div ref={watchRef}>
        <div id="article">
          <MarkdownRenderer
            markdown={blog.content}
            onEndLoad={onEndLoadMarkdown}
          />
        </div>
      </div>
      <Spacer height={50} />
      <Divider />
      <Spacer height={10} />
      <CommentForm />
    </div>
  );
};
