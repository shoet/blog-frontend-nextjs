"use client";
import { useIntersectionObserver } from "@/app/_hooks/useIntersectionObserver";
import hljs from "highlight.js";
import { PropsWithChildren, useEffect } from "react";

/**
 * ClientBlogViewer は、Compositionパターンで配下のid=articleの要素を、id=heading-content-*事にセクションで分けて表示する。
 * 分けたセクションはIntersectionObserverで監視する
 * hljsでコードタグにハイライトを描画する
 */
export const ClientBlogViewer = (props: PropsWithChildren) => {
  const { children } = props;
  const { registerIntersection, cleanup } = useIntersectionObserver();

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

  useEffect(() => {
    cleanup();

    const article = document.getElementById("article");
    if (!article) {
      return;
    }

    // headingから次のheadingまでの要素をsectionで区切り、sectionにidをつける
    const elements = article.querySelectorAll('[id^="heading-content-"]'); // markedで付与したidを抽出する
    elements.forEach((e) => {
      const result = traverseSibling("heading-content-", e, []);
      const section = document.createElement("section");
      const id = e.id;
      e.id = "";
      section.appendChild(e.cloneNode(true));
      result.forEach((e) => {
        section.appendChild(e.cloneNode(true));
      });
      section.id = id;
      e.replaceWith(section);
      result.forEach((e) => e.remove());
    });

    // 区切ったsectionごとにIntersectionObserverで監視する
    const newElements = article.querySelectorAll('[id^="heading-content-"]');
    newElements.forEach((e, idx) => {
      registerIntersection(e, idx);
    });

    document.querySelectorAll("pre code").forEach((block) => {
      const result = hljs.highlightAuto(block.textContent || "");
      block.classList.add("hljs");
      block.setHTMLUnsafe(result.value);
    });

    return () => {
      cleanup();
    };
  }, []);

  return <div id="article">{children}</div>;
};
