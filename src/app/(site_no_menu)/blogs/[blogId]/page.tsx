import { getBlogDetail } from "@/services/getBlogDetail";
import type { Metadata, ResolvingMetadata } from "next";
import { getServerSideCookie } from "@/utils/cookie";
import { getUsersMe } from "@/services/getUsersMe";

import type { UserProfile } from "@/types/api";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";
import { Badge } from "@/app/_components/Atoms/Badge";
import { Divider } from "@/app/_components/Atoms/Divider";
import { CommentForm } from "@/app/_components/Organisms/CommentForm";
import { getComments } from "@/services/getComments";
import clsx from "clsx";
import { BlogContent } from "./_components/BlogContent";
import { Suspense } from "react";

import { marked, type MarkedOptions } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { addLinkTargetBlank } from "@/utils/html";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { TableOfContent } from "./_components/TableOfContent";
import { SkeletonLoader } from "@/app/_components/Molecules/SkeletonLoader";

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

  const SECTION_PREFIX = "heading-content-";

  marked.use(gfmHeadingId({ prefix: SECTION_PREFIX })); // heading要素にidを付与する
  marked.setOptions({
    langPrefix: "",
  } as MarkedOptions);

  const blogHTML = await marked.parse(blog.content, {});
  let html = DOMPurify.sanitize(blogHTML, {}); // サニタイズする
  html = addLinkTargetBlank(html); // aタグに_target属性を付与する

  return (
    <div>
      <div className={clsx("border-gray-300 border-b pb-4")}>
        <div className={clsx("font-bold text-xl")}>{blog.title}</div>
        <Spacer height={20} />
        <div className={clsx("flex flex-row items-center justify-start gap-4")}>
          <div className={clsx("font-bold text-gray-500 text-md")}>
            {toStringYYYYMMDD_HHMMSS(blog.created)}
          </div>
          {blog.tags && (
            <div
              className={clsx(
                "flex flex-row flex-wrap items-center justify-start gap-1",
              )}
            >
              {blog.tags.map((tag) => {
                return <Badge key={tag}>{tag}</Badge>;
              })}
            </div>
          )}
        </div>
      </div>
      <div className={clsx("flex flex-row items-start justify-center gap-6")}>
        <div className={clsx("w-9/12")}>
          <Suspense fallback={<SkeletonLoader rows={15} />}>
            <BlogContent html={html} sectionPrefix={SECTION_PREFIX} />
          </Suspense>
        </div>
        <div className={clsx("sticky top-6 mt-6 w-3/12")}>
          <Suspense fallback={<SkeletonLoader rows={10} />}>
            <TableOfContent html={html} sectionPrefix={SECTION_PREFIX} />
          </Suspense>
        </div>
      </div>
      <Spacer height={50} />
      <Divider />
      <div className={clsx("p-2 font-bold text-lg")}>コメント</div>
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
