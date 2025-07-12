"use client";
import React, { ComponentProps, useEffect, useState } from "react";
import { MarkdownRenderer } from "../MarkdownRenderer";
import css from "./index.module.scss";
import clsx from "clsx";
import { DragableTextarea } from "../../Atoms/DragableTextarea";
import { Spacer } from "../../Atoms/Spacer";

type ClientMarkdownPreviewTextAreaProps = {
  onChangeText?: (text: string) => void;
  onDragDrop?: (file: File) => void;
} & Omit<ComponentProps<"textarea">, "onChange">;

export const ClientMarkdownPreviewTextArea = (
  props: ClientMarkdownPreviewTextAreaProps,
) => {
  const { value, onChangeText: onChange, onDragDrop, ...textareaProps } = props;
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

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
          onChange={handleChangeText}
          onDragDrop={handleDragDrop}
          value={text}
          {...textareaProps}
        />
      </div>
      <Spacer width={20} />
      <div className={css.preview}>
        <MarkdownRenderer markdown={(text as string) || ""} />
      </div>
    </div>
  );
};
