import { Blog } from "@/types/api";
import { BlogCard } from "../BlogCard";
import css from "./index.module.scss";

type ClientBlogCardListProps = {
  blogs: Blog[];
};

export const ClientBlogCardList = (props: ClientBlogCardListProps) => {
  const { blogs } = props;
  return (
    <div className={css.blogs}>
      {blogs.map((b) => {
        return <BlogCard key={b.id} blog={b} />;
      })}
    </div>
  );
};
