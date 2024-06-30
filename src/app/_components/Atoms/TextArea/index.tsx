"use client";

import { useTextArea } from "./useTextArea";
import styles from "./index.module.scss";
import { ComponentProps, CSSProperties } from "react";

type TextAreaProps = {
  maxRows: number;
  minRows: number;
} & ComponentProps<"textarea">;

export const TextArea = (props: TextAreaProps) => {
  const { maxRows = 20, minRows = 5, ...rest } = props;

  const { textareaRef, onChange } = useTextArea({
    minRows: minRows,
    maxRows: maxRows,
  });
  const style = {
    "--font-size": "18px",
    "--line-height": "20px",
  } as CSSProperties;

  return (
    <textarea
      className={styles.textarea}
      style={style}
      ref={textareaRef}
      onChange={onChange}
      wrap="soft"
      rows={minRows}
      {...rest}
    />
  );
};
