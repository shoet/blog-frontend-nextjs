"use client";

import { useTableOfContentContext } from "@/app/_components/Organisms/TableOfContentProvider";
import { type ReactNode, useEffect } from "react";

/**
 * TableOfContentListener は、目次用のContextにchildren内の見出し項目を通知するためのコンポーネントです。
 */
export const TableOfContentListener = (props: { children: ReactNode }) => {
  const { children } = props;
  const { loadHeadings, cleanupHeadings, watchRef } =
    useTableOfContentContext();

  useEffect(() => {
    loadHeadings();
    return () => {
      cleanupHeadings();
    };
  }, [loadHeadings, cleanupHeadings]);

  return (
    <div ref={watchRef}>
      <div id="article">{children}</div>
    </div>
  );
};
