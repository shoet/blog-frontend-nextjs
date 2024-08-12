import { Metadata } from "next";
import css from "./page.module.scss";
import { ClientBlogEditForm } from "@/app/(admin)/_components/Organisms/ClientBlogEditForm";
import { blogPostSubmitAction } from "@/app/(admin)/_components/Organisms/ClientBlogEditForm/actions";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `【NewPost】`,
    description: "Post blog page",
  };
};

const BlogPostPage = async () => {
  return (
    <div className={css.page}>
      <ClientBlogEditForm serverFormAction={blogPostSubmitAction} />
    </div>
  );
};

export default BlogPostPage;
