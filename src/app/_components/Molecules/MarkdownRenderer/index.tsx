"use client";
import React, { useEffect, useRef, useState } from "react";
import { marked, MarkedOptions } from "marked";
import hljs from "highlight.js";
import css from "./index.module.scss";
import "highlight.js/styles/monokai.css";
import { useTableOfContentContext } from "../../Organisms/TableOfContentProvider";

function addLinkTargetBlank(html: string): string {
  const regex = /<a href="(.*?)"/g;
  const replacer = (_: string, p1: string) => `<a href="${p1}" target="_blank"`;
  return html.replace(regex, replacer);
}

export const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  const [htmlContent, setHtmlContent] = useState("");
  const { loadHeadings, cleanupHeadings } = useTableOfContentContext();
  marked.setOptions({
    langPrefix: "",
  } as MarkedOptions);

  useEffect(() => {
    (async function loadHighlightJs() {
      try {
        let mkd = await marked(markdown);
        mkd = addLinkTargetBlank(mkd);
        setHtmlContent(mkd);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [markdown]);

  useEffect(() => {
    loadHeadings(); // TableOfContent用のh1,h2.h3を取得する
    return () => {
      cleanupHeadings(); // TableOfContentのクリーンアップ
    };
  }, [htmlContent]);

  const htmlref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (htmlref.current === null) {
      return;
    }
    hljs.highlightAll();
  }, [htmlref.current?.textContent]);

  return (
    <div
      className={css.markdown}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      ref={htmlref}
    />
  );
};
