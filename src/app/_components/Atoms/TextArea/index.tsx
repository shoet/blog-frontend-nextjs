"use client";
import { useTextArea } from "./useTextArea";
import type { ComponentProps } from "react";
import clsx from "clsx";

type TextAreaProps = {
  onChangeText?: (text: string) => void;
  maxRows?: number;
  minRows?: number;
  border?: boolean;
} & ComponentProps<"textarea">;

export const TextArea = (props: TextAreaProps) => {
  const { maxRows = 20, minRows = 5, border = true, className, ...rest } = props;

  const { textareaRef, onChange } = useTextArea({
    onChangeText: props.onChangeText,
    minRows: minRows,
    maxRows: maxRows,
  });

  return (
    <textarea
      className={clsx(
        "w-full resize-none rounded-sm px-1 py-1 outline-none",
        "text-sm/normal",
        "placeholder:text-gray-300 placeholder:text-sm",
        border ? "border border-black border-solid" : "border-none",
        className,
      )}
      ref={textareaRef}
      onChange={onChange}
      wrap="soft"
      rows={minRows}
      {...rest}
    />
  );
};
