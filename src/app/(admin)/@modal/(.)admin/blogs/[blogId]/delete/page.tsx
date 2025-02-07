import { ClientDeleteConfirmDialog } from "./_components/ClientDeleteConfirmDialog";

type AdminBlogDeleteProps = {
  params: Promise<{
    blogId: number;
  }>;
};

const BlogDeletePage = async (props: AdminBlogDeleteProps) => {
  const { blogId } = await props.params;
  return <ClientDeleteConfirmDialog blogId={blogId} />;
};

export default BlogDeletePage;
