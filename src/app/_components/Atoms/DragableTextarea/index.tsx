import { ComponentProps } from "react";
import { TextArea } from "../TextArea";
import { useDragableTextarea } from "./useDragableTextarea";

type DragableTextAreaProps = {
  maxRows?: number;
  minRows?: number;
  onDragDrop?: (f: File) => void;
} & ComponentProps<"textarea">;

export const DragableTextarea = (props: DragableTextAreaProps) => {
  const { maxRows, minRows, onDragDrop, ...rest } = props;
  const { handleOnDragOver, handleOnDrop } = useDragableTextarea({
    onChange: onDragDrop,
  });
  return (
    <div onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
      <TextArea maxRows={maxRows} minRows={minRows} {...rest} />
    </div>
  );
};
