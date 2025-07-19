"use client";
import type React from "react";
import { type ComponentProps, useEffect, useState } from "react"
import { MarkdownRenderer } from "../MarkdownRenderer";
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
    <div className={clsx("flex min-h-[500px] w-full flex-row items-start")}>
      <div className={clsx("w-1/2")} >
        <DragableTextarea
          onChange={handleChangeText}
          onDragDrop={handleDragDrop}
          value={text}
          {...textareaProps}
          className={clsx(
            "min-h-[500px] w-full rounded-sm p-4",
            "field-sizing-content resize-none outline-none",
          )}
        />
      </div>
      <Spacer width={20} />
      <div className={clsx(
        "sticky top-0 w-1/2 p-2",
        "rounded-sm border border-black border-solid",
        "max-h-dvh min-h-[500px] overflow-y-scroll"
      )}>
        <MarkdownRenderer markdown={(text as string) || ""} />
      </div>
    </div>
  );
};
