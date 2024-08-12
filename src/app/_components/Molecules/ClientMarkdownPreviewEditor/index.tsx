"use client";
import React, { ComponentProps, useEffect, useState } from "react";
import { MarkdownRenderer } from "../MarkdownRenderer";
import css from "./index.module.scss";
import clsx from "clsx";
import { DragableTextarea } from "../../Atoms/DragableTextarea";
import { Spacer } from "../../Atoms/Spacer";

type ClientMarkdownPreviewTextAreaProps = {
  markdownText?: string;
  onChange?: (text: string) => void;
  onDragDrop?: (file: File) => void;
} & ComponentProps<"textarea">;

export const ClientMarkdownPreviewTextArea = (
  props: ClientMarkdownPreviewTextAreaProps,
) => {
  const { markdownText = "", onChange, onDragDrop, ...textareaProps } = props;
  const [text, setText] = useState(markdownText);

  useEffect(() => {
    setText(markdownText);
  }, [markdownText]);

  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onChange?.(e.target.value);
  };

  const handleDragDrop = (file: File) => {
    onDragDrop?.(file);
  };

  return (
    <div className={css.markdownPreviewEditor}>
      <div className={clsx(css.editor, css.textEditor)}>
        <DragableTextarea
          defaultValue={markdownText}
          onChange={handleChangeText}
          onDragDrop={handleDragDrop}
          value={text}
          {...textareaProps}
        />
      </div>
      <Spacer width={20} />
      <div className={css.preview}>
        <MarkdownRenderer markdown={text} />
      </div>
    </div>
  );
};
