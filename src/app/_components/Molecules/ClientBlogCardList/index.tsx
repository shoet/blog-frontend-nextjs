"use client";
import { Blog } from "@/types/api";
import { BlogCard } from "../BlogCard";
import css from "./index.module.scss";
import { useRouter } from "next/navigation";
import { Pagenator } from "../Pagenator";
import { Spacer } from "../../Atoms/Spacer";

type ClientBlogCardListProps = {
  blogs: Blog[];
  pageNubmers?: string[];
};

export const ClientBlogCardList = (props: ClientBlogCardListProps) => {
  const { blogs, pageNubmers = [] } = props;
  const router = useRouter();
  const handleOnClickCard = (blog: Blog) => {
    router.push(`/blogs/${blog.id}`);
  };
  return (
    <div>
      <div className={css.blogs}>
        {blogs.map((b) => {
          return (
            <div key={b.id} onClick={() => handleOnClickCard(b)}>
              <BlogCard blog={b} />
            </div>
          );
        })}
      </div>
      <Spacer height={30} />
      <Pagenator pageNumbers={pageNubmers} />
    </div>
  );
};
