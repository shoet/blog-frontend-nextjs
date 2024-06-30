import { useRef } from "react";

export const useTextArea = ({
  minRows = 5,
  maxRows = 20,
  lineHeight = 20,
}: {
  minRows?: number;
  maxRows?: number;
  lineHeight?: number;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.rows = minRows;
    const scrollHeight = e.target.scrollHeight;
    const rows = Math.floor(scrollHeight / lineHeight);
    if (rows > maxRows) {
      e.target.rows = maxRows;
    } else {
      e.target.rows = rows;
    }
  };

  return { textareaRef, onChange };
};
