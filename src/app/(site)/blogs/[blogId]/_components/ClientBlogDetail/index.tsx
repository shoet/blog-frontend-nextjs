"use client";

import { useTableOfContentContext } from "@/app/_components/Organisms/TableOfContentProvider";
import { useEffect } from "react";
import { HTMLRenderer } from "@/app/_components/Molecules/HTMLRenderer";

export const ClientBlogDetail = (props: { blogHTML: string }) => {
  const { blogHTML } = props;
  const { loadHeadings, cleanupHeadings, watchRef } =
    useTableOfContentContext();

  useEffect(() => {
    loadHeadings();
    return () => {
      cleanupHeadings();
    };
  }, []);

  return (
    <div ref={watchRef}>
      <div id="article">
        <HTMLRenderer rawHTML={blogHTML} />
      </div>
    </div>
  );
};
