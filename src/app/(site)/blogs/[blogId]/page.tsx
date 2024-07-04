type BlogDetailPageProps = {
  params: {
    blogId: string;
  };
  searchParams: {};
};

export default function BlogDetailPage(props: BlogDetailPageProps) {
  return <div>詳細ページ: {props.params.blogId}</div>;
}
