import { getPrivateBlogDetail } from "@/services/getBlogDetail";
import { ClientDeleteConfirmDialog } from "./_components/ClientDeleteConfirmDialog";

type AdminBlogDeleteProps = {
  params: Promise<{
    blogId: number;
  }>;
};

const BlogDeletePage = async (props: AdminBlogDeleteProps) => {
  const { blogId } = await props.params;
  const blog = await getPrivateBlogDetail(blogId);
  return <ClientDeleteConfirmDialog blog={blog} />;
};

export default BlogDeletePage;
