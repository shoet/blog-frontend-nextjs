import { getBlogDetail } from "@/services/getBlogDetail";
import { Metadata, ResolvingMetadata } from "next";
import css from "./page.module.scss";
import { Badge } from "@/app/_components/Atoms/Badge";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { ClientMarkdownView } from "@/app/_components/Molecules/ClientMarkdownView";

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
  return (
    <div>
      <div className={css.title}>{blog.title}</div>
      <Spacer height={20} />
      <div className={css.descriptionArea}>
        <div className={css.date}>{toStringYYYYMMDD_HHMMSS(blog.created)}</div>
        <Spacer width={20} />
        {blog.tags && (
          <div className={css.tags}>
            {blog.tags.map((tag) => {
              return <Badge key={tag}>{tag}</Badge>;
            })}
          </div>
        )}
      </div>
      <Spacer height={20} />
      <div className={css.imageWrapper}>
        <img
          className={css.image}
          src={blog.thumbnailImageFileName}
          alt={blog.title}
        />
      </div>
      <Spacer height={20} />
      <ClientMarkdownView text={blog.content} />
    </div>
  );
};

export default BlogDetailPage;
