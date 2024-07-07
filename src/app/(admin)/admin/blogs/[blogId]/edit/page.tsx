import { getBlogDetail } from "@/services/getBlogDetail";
import { Metadata, ResolvingMetadata } from "next";

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
  return <div>{blog.title}</div>;
};

export default BlogEditPage;
