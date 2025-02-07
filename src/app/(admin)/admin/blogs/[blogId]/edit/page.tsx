import { getPrivateBlogDetail } from "@/services/getBlogDetail";
import { Metadata, ResolvingMetadata } from "next";
import css from "./page.module.scss";
import { ClientBlogEditForm } from "@/app/(admin)/_components/Organisms/ClientBlogEditForm";
import { blogEditSubmitAction } from "@/app/(admin)/_components/Organisms/ClientBlogEditForm/actions";

type BlogEditPageProps = {
  params: Promise<{
    blogId: number;
  }>;
};

export const generateMetadata = async (
  props: BlogEditPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title } = await parent;
  const { blogId } = await props.params;
  const blog = await getPrivateBlogDetail(blogId);
  return {
    title: `【Edit】${blog.title} | ${title?.absolute}`,
    description: "Edit blog page",
  };
};

const BlogEditPage = async (props: BlogEditPageProps) => {
  const { blogId } = await props.params;
  const blog = await getPrivateBlogDetail(blogId);
  return (
    <div className={css.page}>
      <ClientBlogEditForm blog={blog} serverFormAction={blogEditSubmitAction} />
    </div>
  );
};

export default BlogEditPage;
