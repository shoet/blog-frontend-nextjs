"use client";
import React, { useEffect, useState } from "react";
import { marked, MarkedOptions } from "marked";
import "highlight.js/styles/monokai.css";
import { HTMLRenderer } from "../HTMLRenderer";

type Props = {
  markdown: string;
};

export const MarkdownRenderer = (props: Props) => {
  const { markdown } = props;
  const [htmlContent, setHtmlContent] = useState("");
  marked.setOptions({
    langPrefix: "",
  } as MarkedOptions);

  useEffect(() => {
    (async function loadHighlightJs() {
      try {
        let mkd = await marked(markdown);
        setHtmlContent(mkd);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [markdown]);

  return <HTMLRenderer rawHTML={htmlContent} />;
};
