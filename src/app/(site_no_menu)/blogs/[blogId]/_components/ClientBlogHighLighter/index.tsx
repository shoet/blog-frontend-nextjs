"use client";
import hljs from "highlight.js";
import { PropsWithChildren, useEffect } from "react";

const highlightCodeBlock = (dom: Document) => {
  dom.querySelectorAll("pre code").forEach((block) => {
    const result = hljs.highlightAuto(block.textContent || "");
    block.classList.add("hljs");
    block.innerHTML = result.value;
  });
  return dom;
};

export const ClientBlogHighLighter = (props: PropsWithChildren) => {
  const { children } = props;

  useEffect(() => {
    highlightCodeBlock(document);
  }, []);

  return <>{children}</>;
};
