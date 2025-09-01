import { JSDOM } from "jsdom";
import markdownCSS from "@/app/markdown.module.scss";
import { ClientBlogHighLighter } from "../ClientBlogHighLighter";

type Props = {
  html: string;
  sectionPrefix: string;
};

export const BlogContent = async (props: Props) => {
  const { html, sectionPrefix } = props;
  const sectionedHTML = toSectionedArticle(html, sectionPrefix); // 見出しごとにsectionで区切る
  return (
    <ClientBlogHighLighter>
      <div
        id="article"
        className={markdownCSS.markdown}
        // biome-ignore lint: lint/correctness/noUnusedImports
        dangerouslySetInnerHTML={{ __html: sectionedHTML || "" }}
      ></div>
    </ClientBlogHighLighter>
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

const toSectionedArticle = (html: string, headingIdPrefix: string) => {
  let dom = new JSDOM(html);
  const elements =
    dom.window.document.querySelectorAll(`[id^="${headingIdPrefix}"]`) || []; // markedで付与したidを抽出する
  elements.forEach((e) => {
    // 兄弟ノードを取得
    const headingSiblings = traverseSibling("heading-content-", e, []);

    const section = dom.window.document.createElement("section"); // section作成
    section.id = e.id;

    const cloneHeading = e.cloneNode(true) as Element;
    cloneHeading.removeAttribute("id");

    // sectionにElementを詰める
    section.appendChild(cloneHeading);
    headingSiblings.forEach((sibling) => {
      section.appendChild(sibling.cloneNode(true));
      sibling.remove();
    });

    // 既存のheadingとsectionをすげ替え
    e.replaceWith(section);
  });
  return dom.serialize();
};
