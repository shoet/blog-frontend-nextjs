"use client";

import { useTextArea } from "./useTextArea";
import styles from "./index.module.scss";
import type { ComponentProps, CSSProperties } from "react";
import clsx from "clsx";

type TextAreaProps = {
  onChangeText?: (text: string) => void;
  maxRows?: number;
  minRows?: number;
  border?: boolean;
} & ComponentProps<"textarea">;

export const TextArea = (props: TextAreaProps) => {
  const { maxRows = 20, minRows = 5, border = true, ...rest } = props;

  const { textareaRef, onChange } = useTextArea({
    onChangeText: props.onChangeText,
    minRows: minRows,
    maxRows: maxRows,
  });
  const style = {
    "--font-size": "18px",
    "--line-height": "20px",
  } as CSSProperties;

  return (
    <textarea
      className={clsx(styles.textarea, border && styles.border)}
      style={style}
      ref={textareaRef}
      onChange={onChange}
      wrap="soft"
      rows={minRows}
      {...rest}
    />
  );
};
