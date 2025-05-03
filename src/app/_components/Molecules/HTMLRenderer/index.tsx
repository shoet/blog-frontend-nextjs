"use client";
import React, { useEffect, useRef } from "react";
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
  const replacer = (_: string, p1: string) => `<a href="${p1}" target="_blank"`;
  return html.replace(regex, replacer);
}

/**
 * HTMLRenderer は、HTMLを受け取り、サニタイズ処理、タグの補正、ハイライトの適用を行うコンポーネントです。
 */
export const HTMLRenderer = (props: Props) => {
  let rawHTML = addLinkTargetBlank(props.rawHTML);

  const htmlref = useRef<HTMLDivElement>(null);
  // HTMLがレンダリングされたあとにHighlightを実行する
  useEffect(() => {
    if (htmlref.current === null) {
      return;
    }
    hljs.highlightAll();
  }, [htmlref.current?.textContent]);

  return (
    <div
      className={css.markdown}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(rawHTML) }}
      ref={htmlref}
    />
  );
};
