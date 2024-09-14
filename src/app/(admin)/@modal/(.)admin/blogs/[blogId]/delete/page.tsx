import { ClientDeleteConfirmDialog } from "./_components/ClientDeleteConfirmDialog";

type AdminBlogDeleteProps = {
  params: {
    blogId: number;
  };
};

export default function Page(props: AdminBlogDeleteProps) {
  const { blogId } = props.params;
  return <ClientDeleteConfirmDialog blogId={blogId} />;
}
