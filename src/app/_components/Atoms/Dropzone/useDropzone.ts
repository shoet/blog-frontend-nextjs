import { useRef, useState } from "react";

type DropzoneError = {
  errors: string[];
};

export const useDropzone = (props: { onChange?: (file: File) => void }) => {
  const { onChange } = props;
  const [file, setFile] = useState<File>();
  const [error, setError] = useState<DropzoneError>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnDrop = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setError(undefined);
    const fileList = e.dataTransfer.files;
    if (fileList.length === 0) return;
    if (fileList.length > 1) {
      setError({ errors: ["アップロードできるファイルは1つだけです。"] });
    }
    setFile(fileList[0]);
    onChange?.(fileList[0]);
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleOnClickInput = () => {
    inputRef.current?.click();
  };

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files == null) return;
    const fileList = e.target.files;
    if (fileList.length > 1) {
      setError({ errors: ["アップロードできるファイルは1つだけです。"] });
    }
    setFile(fileList[0]);
    onChange?.(fileList[0]);
  };

  return {
    file,
    inputRef,
    handleOnDrop,
    handleOnDragOver,
    handleOnClickInput,
    handleOnInputChange,
    error,
  };
};
