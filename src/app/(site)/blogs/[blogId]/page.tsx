import { getBlogDetail } from "@/services/getBlogDetail";
import { Metadata, ResolvingMetadata } from "next";
import { ClientBlogDetail } from "./_components/ClientBlogDetail";

type BlogDetailPageProps = {
  params: Promise<{
    blogId: number;
  }>;
  searchParams: Promise<{}>;
};

export const generateMetadata = async (
  props: BlogDetailPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title } = await parent;
  const { blogId } = await props.params;
  const blog = await getBlogDetail(blogId);
  return {
    title: `${blog.title} | ${title?.absolute}`,
    description: blog.description,
  };
};

const BlogDetailPage = async (props: BlogDetailPageProps) => {
  const { blogId } = await props.params;
  const blog = await getBlogDetail(blogId);
  return <ClientBlogDetail blog={blog} />;
};

export default BlogDetailPage;
