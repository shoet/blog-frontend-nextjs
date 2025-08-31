import { Blog } from "@/types/api";
import clsx from "clsx";
import { marked, type MarkedOptions } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { addLinkTargetBlank } from "@/utils/html";
import {
  ClientTableOfContent,
  Heading,
  HeadingType,
} from "@/app/_components/Organisms/TableOfContent";
import hljs from "highlight.js";
import { JSDOM } from "jsdom";
import { gfmHeadingId } from "marked-gfm-heading-id";
import markdownCSS from "@/app/markdown.module.scss";
import { SkeletonLoader } from "@/app/_components/Molecules/SkeletonLoader";
import { ComponentProps } from "react";

type Props = {
  blog: Blog;
};

export const BlogContent = async (props: Props) => {
  const { blog } = props;
  const SECTION_PREFIX = "heading-content-";

  marked.use(gfmHeadingId({ prefix: SECTION_PREFIX })); // heading要素にidを付与する
  marked.setOptions({
    langPrefix: "",
  } as MarkedOptions);

  const blogHTML = await marked.parse(blog.content, {});
  let html = DOMPurify.sanitize(blogHTML, {}); // サニタイズする
  html = addLinkTargetBlank(html); // aタグに_target属性を付与する
  let dom = new JSDOM(html).window.document;
  dom = highlightCodeBlock(dom); // コードブロックをハイライトする
  const headings = getHeadings(dom); // 見出し要素を抽出する
  dom = toSectionedArticle(dom); // 見出しごとにsectionで区切る
  return (
    <div className={clsx("flex flex-row items-start justify-center gap-6")}>
      <div className={clsx("w-9/12")}>
        <div
          id="article"
          className={markdownCSS.markdown}
          // biome-ignore lint: lint/correctness/noUnusedImports
          dangerouslySetInnerHTML={{ __html: html || "" }}
        ></div>
      </div>
      <div className={clsx("sticky top-6 mt-6 w-3/12")}>
        <ClientTableOfContent
          headings={headings}
          intersectionObserveIdPrefix={SECTION_PREFIX}
          rootId="article"
        />
      </div>
    </div>
  );
};

export const BlogContentLoading = (props: ComponentProps<"div">) => {
  const { className, ...rest } = props;
  return (
    <div
      className={clsx(
        "flex flex-row items-start justify-center gap-6",
        className,
      )}
      {...rest}
    >
      <div className={clsx("w-9/12")}>
        <SkeletonLoader rows={15} />
      </div>
      <div className={clsx("sticky top-6 w-3/12")}>
        <SkeletonLoader rows={10} />
      </div>
    </div>
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

const getHeadings = (dom: Document): Heading[] => {
  const elements = dom.querySelectorAll('[id^="heading-content-"]') || []; // markedで付与したidを抽出する
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

const highlightCodeBlock = (dom: Document) => {
  dom.querySelectorAll("pre code").forEach((block) => {
    const result = hljs.highlightAuto(block.textContent || "");
    block.classList.add("hljs");
    block.innerHTML = result.value;
  });
  return dom;
};

const toSectionedArticle = (dom: Document) => {
  const elements = dom.querySelectorAll('[id^="heading-content-"]') || []; // markedで付与したidを抽出する
  elements.forEach((e) => {
    const cloneHeading = e.cloneNode(true) as Element;
    const headingSiblings = traverseSibling(
      "heading-content-",
      cloneHeading,
      [],
    ); // 兄弟ノード
    const section = dom.createElement("section"); // section作成
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
  return dom;
};
