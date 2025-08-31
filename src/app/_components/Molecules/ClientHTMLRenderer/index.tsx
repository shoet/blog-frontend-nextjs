"use client";
import { useEffect, useState } from "react";
import hljs from "highlight.js";
import markdownCSS from "@/app/markdown.module.scss";
import "highlight.js/styles/monokai.css";
import DOMPurify from "isomorphic-dompurify";
import { addLinkTargetBlank } from "@/utils/html";

type Props = {
  rawHTML: string;
};

/**
 * HTMLRenderer は、HTMLを受け取り、サニタイズ処理、タグの補正、ハイライトの適用を行うコンポーネントです。
 */
export const ClientHTMLRenderer = (props: Props) => {
  const [html, setHTML] = useState(props.rawHTML);

  // 'use client'をつけてもClientComponentと判定されずビルドエラーになるため、useEffectで囲む
  useEffect(() => {
    const parse = new DOMParser();
    const dom = parse.parseFromString(props.rawHTML, "text/html");
    dom.querySelectorAll("pre code").forEach((block) => {
      const result = hljs.highlightAuto(block.textContent || "");
      block.classList.add("hljs");
      block.setHTMLUnsafe(result.value);
    });
    let html = DOMPurify.sanitize(dom.body.innerHTML, {});
    html = addLinkTargetBlank(html);
    setHTML(html);
  }, [props.rawHTML]);
  return (
    <div
      className={markdownCSS.markdown}
      // biome-ignore lint: lint/correctness/noUnusedImports
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
};
