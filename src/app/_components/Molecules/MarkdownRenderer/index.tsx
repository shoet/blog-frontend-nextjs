"use client";
import React, { useEffect, useState } from "react";
import { marked, MarkedOptions } from "marked";
import hljs from "highlight.js";
import css from "./index.module.scss";
import "highlight.js/styles/monokai.css";

function addLinkTargetBlank(html: string): string {
  const regex = /<a href="(.*?)"/g;
  const replacer = (_: string, p1: string) => `<a href="${p1}" target="_blank"`;
  return html.replace(regex, replacer);
}

export const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  const [htmlContent, setHtmlContent] = useState("");
  marked.setOptions({
    langPrefix: "",
  } as MarkedOptions);

  useEffect(() => {
    (async function loadHighlightJs() {
      const mkd = await marked(markdown);
      const markedHtmlWithTargetBlank = addLinkTargetBlank(mkd);
      setHtmlContent(markedHtmlWithTargetBlank);
    })();
  }, [markdown]);

  useEffect(() => {
    hljs.highlightAll();
  }, [htmlContent]);

  return (
    <div
      className={css.markdown}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
