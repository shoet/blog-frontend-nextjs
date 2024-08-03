"use client";
import React, { useState } from "react";
import { MarkdownRenderer } from "../MarkdownRenderer";
import css from "./index.module.scss";
import clsx from "clsx";
import { TextArea } from "../../Atoms/TextArea";

type ClientMarkdownPreviewTextAreaProps = {
  markdownText?: string;
  onChange?: (text: string) => void;
};

export const ClientMarkdownPreviewTextArea = (
  props: ClientMarkdownPreviewTextAreaProps,
) => {
  const { markdownText = "", onChange } = props;
  const [text, setText] = useState(markdownText);

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={css.markdownPreviewEditor}>
      <div className={clsx(css.editor, css.textEditor)}>
        <TextArea onChange={handleChangeText} />
      </div>
      <div className={css.preview}>
        <MarkdownRenderer markdown={text} />
      </div>
    </div>
  );
};
