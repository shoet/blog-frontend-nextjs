"use server";
import React from "react";
import hljs from "highlight.js";
import css from "./index.module.scss";
import "highlight.js/styles/monokai.css";
import DOMPurify from "isomorphic-dompurify";
import { JSDOM } from "jsdom";

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
export const HTMLRenderer = async (props: Props) => {
  let html = addLinkTargetBlank(props.rawHTML);
  const dom = new JSDOM(html);
  dom.window.document.querySelectorAll("pre code").forEach((block) => {
    const result = hljs.highlightAuto(block.textContent || "");
    block.classList.add("hljs");
    block.innerHTML = result.value;
  });
  html = DOMPurify.sanitize(dom.window.document.body.innerHTML, {});
  return (
    <div
      className={css.markdown}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
};
