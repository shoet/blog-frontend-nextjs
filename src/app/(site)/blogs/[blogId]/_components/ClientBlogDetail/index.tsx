"use client";

import { Blog } from "@/types/api";
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
    <div ref={watchRef}>
      <div id="article">
        <MarkdownRenderer
          markdown={blog.content}
          onEndLoad={onEndLoadMarkdown}
        />
      </div>
    </div>
  );
};
