import {
  ClientTableOfContent,
  Heading,
  HeadingType,
} from "@/app/_components/Organisms/ClientTableOfContent";
import { JSDOM } from "jsdom";

type Props = {
  html: string;
  sectionPrefix: string;
};

export const TableOfContent = (props: Props) => {
  const { html, sectionPrefix } = props;

  const headings = getHeadings(html, sectionPrefix); // 見出し要素を抽出する

  return (
    <ClientTableOfContent
      headings={headings}
      intersectionObserveIdPrefix={sectionPrefix}
      rootId="article"
    />
  );
};

const getHeadings = (html: string, headingIdPrefix: string): Heading[] => {
  let dom = new JSDOM(html);
  const elements =
    dom.window.document.querySelectorAll(`[id^="${headingIdPrefix}"]`) || []; // markedで付与したidを抽出する
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
