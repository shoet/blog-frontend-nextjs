"use client";

import { useRouter } from "next/navigation";
import css from "./index.module.scss";
import clsx from "clsx";

type PagenatorProps = {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
};

const PagenatorButton = (props: {
  pageNumber: string;
  onClick: () => void;
  isCurrent?: boolean;
}) => {
  const { pageNumber, onClick, isCurrent = false } = props;
  return (
    <button
      type="button"
      className={clsx(
        css.pagenatorButton,
        isCurrent && css.pagenatorButtonActive,
      )}
      onClick={onClick}
    >
      {pageNumber}
    </button>
  );
};

export const Pagenator = (props: PagenatorProps) => {
  const { totalItems, currentPage, itemsPerPage } = props;

  const router = useRouter();
  const handleClickPage = (pageNum: number) => {
    router.push(`/blogs?page=${pageNum}`);
  };
  const pages = paginate({
    current: currentPage,
    max: Math.ceil(totalItems / itemsPerPage),
  });

  return (
    pages && (
      <div className={css.pagenator}>
        {pages.items.map((pageNum, index) => (
          <PagenatorButton
            key={pageNum}
            pageNumber={pageNum}
            onClick={() =>
              pageNum !== currentPage.toString() &&
              handleClickPage(parseInt(pageNum))
            }
            isCurrent={pageNum === currentPage.toString()}
          />
        ))}
      </div>
    )
  );
};

type PaginatePages = {
  current: number;
  prev: number | null;
  next: number | null;
  items: string[];
};

function paginate({
  current,
  max,
}: {
  current: number;
  max: number;
}): PaginatePages | null {
  if (!current || !max) return null;

  var items: string[] = ["1"];

  const prev = current === 1 ? null : current - 1;
  const next = current === max ? null : current + 1;

  if (current === 1 && max === 1) return { current, prev, next, items };
  if (current > 4) items.push("…");

  const r = 2,
    r1 = current - r,
    r2 = current + r;

  for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++)
    items.push(i.toString());

  if (r2 + 1 < max) items.push("…");
  if (r2 < max) items.push(max.toString());

  return { current, prev, next, items };
}
