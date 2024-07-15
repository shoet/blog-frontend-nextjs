"use client";
import { Blog } from "@/types/api";
import { BlogCard } from "../BlogCard";
import css from "./index.module.scss";
import { useRouter } from "next/navigation";

type ClientBlogCardListProps = {
  blogs: Blog[];
};

export const ClientBlogCardList = (props: ClientBlogCardListProps) => {
  const { blogs } = props;
  const router = useRouter();
  const handleOnClickCard = (blog: Blog) => {
    router.push(`/blogs/${blog.id}`);
  };
  return (
    <div className={css.blogs}>
      {blogs.map((b) => {
        return (
          <div key={b.id} onClick={() => handleOnClickCard(b)}>
            <BlogCard blog={b} />
          </div>
        );
      })}
    </div>
  );
};
