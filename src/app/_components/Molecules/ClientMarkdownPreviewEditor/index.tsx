"use client";
import React, { useEffect, useState } from "react";
import { MarkdownRenderer } from "../MarkdownRenderer";
import css from "./index.module.scss";
import clsx from "clsx";
import { DragableTextarea } from "../../Atoms/DragableTextarea";

type ClientMarkdownPreviewTextAreaProps = {
  markdownText?: string;
  onChange?: (text: string) => void;
  onDragDrop?: (file: File) => void;
};

export const ClientMarkdownPreviewTextArea = (
  props: ClientMarkdownPreviewTextAreaProps,
) => {
  const { markdownText = "", onChange, onDragDrop } = props;
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
          value={markdownText}
          onChange={handleChangeText}
          onDragDrop={handleDragDrop}
        />
      </div>
      <div className={css.preview}>
        <MarkdownRenderer markdown={text} />
      </div>
    </div>
  );
};
