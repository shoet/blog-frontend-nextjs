"use client";

import { useRouter } from "next/navigation";
import css from "./index.module.scss";
import clsx from "clsx";

type PagenatorProps = {
  pageNumbers: string[]; // ex: ["1", "2", "3", "...", "10"]
  currentPage?: string;
};

const PagenatorButton = (props: {
  pageNumber: string;
  onClick: () => void;
  isCurrent?: boolean;
}) => {
  const { pageNumber, onClick, isCurrent = false } = props;
  return (
    <div
      className={clsx(
        css.pagenatorButton,
        isCurrent && css.pagenatorButtonActive,
      )}
      onClick={onClick}
    >
      {pageNumber}
    </div>
  );
};

export const Pagenator = (props: PagenatorProps) => {
  const { pageNumbers, currentPage } = props;
  const router = useRouter();
  const handleClickPage = (pageNum: number) => {
    router.push(`/blogs?page=${pageNum}`);
  };

  return (
    <div className={css.pagenator}>
      {pageNumbers.map((pageNum, index) => (
        <PagenatorButton
          key={index}
          pageNumber={pageNum}
          onClick={() =>
            pageNum !== currentPage && handleClickPage(parseInt(pageNum))
          }
          isCurrent={pageNum === currentPage}
        />
      ))}
    </div>
  );
};
