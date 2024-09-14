import { Blog } from "@/types/api";
import css from "./index.module.scss";
import { ClientBlogTableRow } from "../ClientBlogTableRow";

type BlogTableProps = {
  blogs: Blog[];
};

export const BlogTable = (props: BlogTableProps) => {
  const { blogs } = props;

  return (
    <table className={css.blogTable}>
      <tbody className={css.blogTableBody}>
        {blogs.map((b) => {
          return <ClientBlogTableRow key={b.id} blog={b} />;
        })}
      </tbody>
    </table>
  );
};
