"use client";
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import css from "./index.module.scss";
import "highlight.js/styles/monokai.css";
import DOMPurify from "isomorphic-dompurify";

type Props = {
  rawHTML: string;
};

// aタグにtarget="_blank"を追加する関数
function addLinkTargetBlank(html: string): string {
  const regex = /<a href="(.*?)"/g;
  const replacer = (_: string, p1: string) =>
    `<a href="${p1}" target="_blank" rel="noopener noreferrer"`;
  return html.replace(regex, replacer);
}

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
      className={css.markdown}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
};
