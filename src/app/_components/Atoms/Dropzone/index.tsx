"use client";
import { IconUpload } from "../Icon";
import { useDropzone } from "./useDropzone";
import clsx from "clsx";

type DropzoneProps = {
  isError?: boolean;
  onChange?: (file?: File) => void;
  children?: React.ReactNode;
};

export const Dropzone = (props: DropzoneProps) => {
  const { isError, onChange, children } = props;
  const {
    inputRef,
    error,
    handleOnDrop,
    handleOnDragOver,
    handleOnClickInput,
    handleOnInputChange,
  } = useDropzone({
    onChange,
  });
  return (
    <div className={clsx()}>
      <input hidden type="file" onChange={handleOnInputChange} ref={inputRef} />
      <button
        type="button"
        className={clsx(
          "flex flex-col justify-center",
          "h-full w-full rounded-md p-5",
          "cursor-pointer",
          "border-2 border-dashed",
          isError ? "border-red-500" : "border-gray-500",
        )}
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onClick={handleOnClickInput}
      >
        {children ? children : (
          <div className={clsx(
            "flex flex-col gap-5 align-middle"
          )}>
            <IconUpload size="2x" color="gray" />
            <div className={clsx(
              "font-medium text-gray-500"
            )}>
              クリックまたは、ファイルをドラッグしてください
            </div>
          </div>
        )}
      </button>
      {error && (
        <div>
          {error.errors.map((msg) => {
            return <div key={msg}>{msg}</div>;
          })}
        </div>
      )}
    </div>
  )
}
