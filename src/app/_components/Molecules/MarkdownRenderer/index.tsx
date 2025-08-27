"use client";
import { useEffect, useState } from "react";
import { marked } from "marked";
import "highlight.js/styles/monokai.css";
import { ClientHTMLRenderer } from "../ClientHTMLRenderer";

type Props = {
  markdown: string;
};

export const MarkdownRenderer = (props: Props) => {
  const { markdown } = props;
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const mkd = await marked(markdown);
        setHtmlContent(mkd);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [markdown]);

  return <ClientHTMLRenderer rawHTML={htmlContent} />;
};
