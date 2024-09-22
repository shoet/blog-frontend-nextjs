import { Blog } from "@/types/api";
import { BlogCard } from "../BlogCard";
import css from "./index.module.scss";
import { Pagenator } from "../Pagenator";
import { Spacer } from "../../Atoms/Spacer";
import Link from "next/link";

type ClientBlogCardListProps = {
  blogs: Blog[];
  totalItems?: number;
  currentPage?: number;
  itemsPerPage?: number;
};

export const ClientBlogCardList = (props: ClientBlogCardListProps) => {
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
