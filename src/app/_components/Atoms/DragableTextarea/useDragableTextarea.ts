"use client";
import { useState } from "react";

type DragableTextareaError = {
  errors: string[];
};

export const useDragableTextarea = ({
  onChange,
}: {
  onChange?: (f: File) => void;
}) => {
  const [error, setError] = useState<DragableTextareaError>();

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fileList = e.dataTransfer.files;
    if (fileList.length === 0) return;
    if (fileList.length > 1) {
      setError({
        errors: ["ファイルは1つだけ選択してください"],
      });
      return;
    }
    onChange && onChange(fileList[0]);
  };

  return { error, handleOnDragOver, handleOnDrop };
};
