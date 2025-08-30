import { getBlogDetail } from "@/services/getBlogDetail";
import type { Metadata, ResolvingMetadata } from "next";
import { getServerSideCookie } from "@/utils/cookie";
import { getUsersMe } from "@/services/getUsersMe";
import DOMPurify from "isomorphic-dompurify";

import type { UserProfile } from "@/types/api";
import css from "./page.module.scss";
import markdownCSS from "@/app/markdown.module.scss";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";
import { Badge } from "@/app/_components/Atoms/Badge";
import { Divider } from "@/app/_components/Atoms/Divider";
import { CommentForm } from "@/app/_components/Organisms/CommentForm";
import { getComments } from "@/services/getComments";
import { marked, MarkedExtension, type MarkedOptions } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { addLinkTargetBlank } from "@/utils/html";
import { ClientBlogViewer } from "./_components/ClientBlogViewer";

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

const Comment = async (props: { blogId: number }) => {
  const [userProfile, { comments }] = await Promise.all([
    getProfile(),
    getComments(props.blogId),
  ]);

  return (
    <CommentForm
      blogId={props.blogId}
      comments={comments}
      commentUser={userProfile}
    />
  );
};

const BlogDetailPage = async (props: BlogDetailPageProps) => {
  const { blogId } = await props.params;
  const blog = await getBlogDetail(blogId);

  marked.use(gfmHeadingId({ prefix: "heading-content-" })); // heading要素にidを付与する
  marked.setOptions({
    langPrefix: "",
  } as MarkedOptions);

  const blogHTML = await marked.parse(blog.content, {});
  let html = DOMPurify.sanitize(blogHTML, {});
  html = addLinkTargetBlank(html);

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
      <ClientBlogViewer>
        <div
          className={markdownCSS.markdown}
          // biome-ignore lint: lint/correctness/noUnusedImports
          dangerouslySetInnerHTML={{ __html: html || "" }}
        />
      </ClientBlogViewer>
      <Spacer height={50} />
      <Divider />
      <div className={css.commentTitle}>コメント</div>
      <Spacer height={10} />
      <Comment blogId={blogId} />
    </div>
  );
};

async function getProfile(): Promise<UserProfile | undefined> {
  const token = await getServerSideCookie("authToken");
  if (!token) return;
  try {
    const user = await getUsersMe(token.value);
    return user.profile;
  } catch (e) {
    console.warn("Failed to fetch user profile", e);
  }
}

export default BlogDetailPage;
