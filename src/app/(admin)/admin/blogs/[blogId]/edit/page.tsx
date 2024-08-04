import { getBlogDetail } from "@/services/getBlogDetail";
import { Metadata, ResolvingMetadata } from "next";
import css from "./page.module.scss";
import { ClientBlogEditForm } from "@/app/(admin)/_components/Organisms/ClientBlogEditForm";

type BlogEditPageProps = {
  params: {
    blogId: number;
  };
};

export const generateMetadata = async (
  props: BlogEditPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title } = await parent;
  const { blogId } = props.params;
  const blog = await getBlogDetail(blogId);
  return {
    title: `【Edit】${blog.title} | ${title?.absolute}`,
    description: "Edit blog page",
  };
};

const BlogEditPage = async (props: BlogEditPageProps) => {
  const { blogId } = props.params;
  const blog = await getBlogDetail(blogId);
  return (
    <div className={css.page}>
      <ClientBlogEditForm blog={blog} />
    </div>
  );
};

export default BlogEditPage;
