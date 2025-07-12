"use client";
import { IconUpload } from "../Icon";
import css from "./index.module.scss";
import { useDropzone } from "./useDropzone";
import clsx from "clsx";

type DropzoneProps = {
  isError?: boolean;
  onChange?: (file?: File) => void;
  children?: React.ReactNode;
};

const DropzoneDisplay = () => {
  return (
    <div className={clsx(css.defaultDisplay)}>
      <IconUpload size="2x" color="gray" />
      <div className={clsx(css.description)}>
        クリックまたは、ファイルをドラッグしてください
      </div>
    </div>
  );
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
    <div>
      <input hidden type="file" onChange={handleOnInputChange} ref={inputRef} />
      <button
        type="button"
        className={clsx(css.dropzone, isError && css["dropzone--error"])}
        onDrop={handleOnDrop}
        onDragOver={handleOnDragOver}
        onClick={handleOnClickInput}
      >
        {children ? children : <DropzoneDisplay />}
      </button>
      {error && (
        <div>
          {error.errors.map((msg) => {
            return <div key={msg}>{msg}</div>;
          })}
        </div>
      )}
    </div>
  );
};
