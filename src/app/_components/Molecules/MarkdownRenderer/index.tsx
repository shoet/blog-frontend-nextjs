"use client";
import React, { useEffect, useRef, useState } from "react";
import { marked, MarkedOptions } from "marked";
import hljs from "highlight.js";
import css from "./index.module.scss";
import "highlight.js/styles/monokai.css";

function addLinkTargetBlank(html: string): string {
  const regex = /<a href="(.*?)"/g;
  const replacer = (_: string, p1: string) => `<a href="${p1}" target="_blank"`;
  return html.replace(regex, replacer);
}

type Props = {
  markdown: string;
  onEndLoad?: () => void;
};

export const MarkdownRenderer = (props: Props) => {
  const { markdown, onEndLoad } = props;
  const [htmlContent, setHtmlContent] = useState("");
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

  const htmlref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (htmlref.current === null) {
      return;
    }
    hljs.highlightAll();
  }, [htmlref.current?.textContent]);

  useEffect(() => {
    onEndLoad && onEndLoad();
  }, [htmlContent]);

  return (
    <div
      className={css.markdown}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      ref={htmlref}
    />
  );
};
