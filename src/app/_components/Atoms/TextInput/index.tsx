import type { ComponentProps } from "react";
import clsx from "clsx";

type TextInputProps = {
  hasBorder?: boolean;
  isError?: boolean;
} & ComponentProps<"input">;

export const TextInput = (props: TextInputProps) => {
  const { hasBorder = true, isError = false, ...rest } = props;

  return (
    <input
      className={clsx(
        "rounded-sm border-none p-2 text-sm",
        hasBorder && "border-2 border-gray-500 border-solid",
        isError && "border-red-500",
      )}
      type="text"
      {...rest}
    />
  );
}
