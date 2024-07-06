import { getBlogDetail } from "@/services/getBlogDetail";
import { Metadata, ResolvingMetadata } from "next";

type BlogDetailPageProps = {
  params: {
    blogId: number;
  };
  searchParams: {};
};

export const generateMetadata = async (
  props: BlogDetailPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title } = await parent;
  const { blogId } = props.params;
  const blog = await getBlogDetail(blogId);
  return {
    title: `${blog.title} | ${title?.absolute}`,
    description: blog.description,
  };
};

const BlogDetailPage = async (props: BlogDetailPageProps) => {
  const { blogId } = props.params;
  const blog = await getBlogDetail(blogId);
  return <div>{blog.title}</div>;
};

export default BlogDetailPage;
