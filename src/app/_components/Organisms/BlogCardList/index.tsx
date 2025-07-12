import type { Blog } from "@/types/api";
import { BlogCard } from "../BlogCard";
import css from "./index.module.scss";
import { Spacer } from "../../Atoms/Spacer";
import Link from "next/link";
import { Pagenator } from "../../Molecules/Pagenator";

type BlogCardListProps = {
  blogs: Blog[];
  totalItems?: number;
  currentPage?: number;
  itemsPerPage?: number;
};

export const BlogCardList = (props: BlogCardListProps) => {
  const { blogs, totalItems = 1, currentPage = 1, itemsPerPage = 5 } = props;

  return (
    <div>
      <div className={css.blogs}>
        {blogs.map((b) => {
          return (
            <Link href={`/blogs/${b.id}`} key={b.id}>
              <BlogCard blog={b} />
            </Link>
          );
        })}
      </div>
      <Spacer height={30} />
      <Pagenator
        totalItems={totalItems}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
};
