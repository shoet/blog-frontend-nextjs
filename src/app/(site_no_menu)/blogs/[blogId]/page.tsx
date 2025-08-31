import { getBlogDetail } from "@/services/getBlogDetail";
import type { Metadata, ResolvingMetadata } from "next";
import { getServerSideCookie } from "@/utils/cookie";
import { getUsersMe } from "@/services/getUsersMe";
import DOMPurify from "isomorphic-dompurify";

import type { UserProfile } from "@/types/api";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { toStringYYYYMMDD_HHMMSS } from "@/utils/date";
import { Badge } from "@/app/_components/Atoms/Badge";
import { Divider } from "@/app/_components/Atoms/Divider";
import { CommentForm } from "@/app/_components/Organisms/CommentForm";
import { getComments } from "@/services/getComments";
import { marked, type MarkedOptions } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { addLinkTargetBlank } from "@/utils/html";
import markdownCSS from "@/app/markdown.module.scss";
import clsx from "clsx";
import { JSDOM } from "jsdom";
import hljs from "highlight.js";
import {
  ClientTableOfContent,
  Heading,
  HeadingType,
} from "@/app/_components/Organisms/TableOfContent";

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

// 次のidがprefixで始まるまでの兄弟要素を取得する
const traverseSibling = (
  prefix: string,
  currentElement: Element,
  elements: Element[],
): Element[] => {
  const nextElement = currentElement.nextElementSibling;
  if (nextElement === null) {
    return elements;
  }
  const id = nextElement.id;
  if (id.startsWith(prefix)) {
    return elements;
  }
  elements.push(nextElement);
  return traverseSibling(prefix, nextElement, elements);
};

const getHeadings = (html: string): Heading[] => {
  const dom = new JSDOM(html);
  const elements =
    dom.window.document.querySelectorAll('[id^="heading-content-"]') || []; // markedで付与したidを抽出する
  const headings: Heading[] = [];
  elements.forEach((e) => {
    if (["h1", "h2", "h3"].includes(e.tagName.toLowerCase())) {
      headings.push({
        id: e.id,
        type: e.tagName.toLowerCase() as HeadingType,
        content: e.textContent || "",
      });
    }
  });
  return headings;
};

const highlightCodeBlock = (html: string) => {
  const dom = new JSDOM(html);
  dom.window.document.querySelectorAll("pre code").forEach((block) => {
    const result = hljs.highlightAuto(block.textContent || "");
    block.classList.add("hljs");
    block.innerHTML = result.value;
  });
  return dom.serialize();
};

const toSectionedArticle = (html: string) => {
  const dom = new JSDOM(html);
  const elements =
    dom.window.document.querySelectorAll('[id^="heading-content-"]') || []; // markedで付与したidを抽出する
  elements.forEach((e) => {
    const cloneHeading = e.cloneNode(true) as Element;
    const headingSiblings = traverseSibling(
      "heading-content-",
      cloneHeading,
      [],
    ); // 兄弟ノード
    const section = dom.window.document.createElement("section"); // section作成
    section.id = cloneHeading.id;
    cloneHeading.removeAttribute("id");
    // sectionにElementを詰める
    section.appendChild(cloneHeading);
    headingSiblings.forEach((e) => {
      section.appendChild(e.cloneNode(true));
      e.remove();
    });
    // 既存のheadingとsectionをすげ替え
    e.replaceWith(section);
    e.remove();
  });
  return dom.serialize();
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
  html = highlightCodeBlock(html); // コードブロックをハイライトする
  const headings = getHeadings(html); // 見出し要素を抽出する
  html = toSectionedArticle(html); // 見出しごとにsectionで区切る

  return (
    <div>
      <div className={clsx("pb-4 border-b border-gray-300")}>
        <div className={clsx("text-xl font-bold")}>{blog.title}</div>
        <Spacer height={20} />
        <div className={clsx("flex flex-row items-center justify-start gap-4")}>
          <div className={clsx("text-md font-bold text-gray-500")}>
            {toStringYYYYMMDD_HHMMSS(blog.created)}
          </div>
          {blog.tags && (
            <div
              className={clsx(
                "flex flex-row justify-start items-center flex-wrap gap-1",
              )}
            >
              {blog.tags.map((tag) => {
                return <Badge key={tag}>{tag}</Badge>;
              })}
            </div>
          )}
        </div>
      </div>
      <div className={clsx("flex flex-row items-start gap-6 justify-center")}>
        <div className={clsx("w-9/12")}>
          <div
            id="article"
            className={markdownCSS.markdown}
            // biome-ignore lint: lint/correctness/noUnusedImports
            dangerouslySetInnerHTML={{ __html: html || "" }}
          ></div>
        </div>
        <div className={clsx("w-3/12 mt-6 sticky top-6")}>
          <ClientTableOfContent
            headings={headings}
            intersectionObserveIdPrefix={SECTION_PREFIX}
            rootId="article"
          />
        </div>
      </div>
      <Spacer height={50} />
      <Divider />
      <div className={clsx("text-lg font-bold p-2")}>コメント</div>
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
