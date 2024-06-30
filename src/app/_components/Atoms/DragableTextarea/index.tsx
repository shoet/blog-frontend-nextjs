import { ComponentProps } from "react";
import { TextArea } from "../TextArea";
import { useDragableTextarea } from "./useDragableTextarea";

type DragableTextAreaProps = {
  maxRows?: number;
  minRows?: number;
  onDrag?: (f: File) => void;
} & ComponentProps<"textarea">;

export const DragableTextarea = (props: DragableTextAreaProps) => {
  const { maxRows, minRows, onDrag, ...rest } = props;
  const { handleOnDragOver, handleOnDrop } = useDragableTextarea({
    onChange: onDrag,
  });
  return (
    <div onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
      <TextArea maxRows={maxRows} minRows={minRows} {...rest} />
    </div>
  );
};
