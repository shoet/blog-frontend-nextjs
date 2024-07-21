"use client";
import { MarkdownRenderer } from "../MarkdownRenderer";

export const ClientMarkdownView = (props: { text: string }) => {
  const { text } = props;
  return <MarkdownRenderer markdown={text} />;
};
