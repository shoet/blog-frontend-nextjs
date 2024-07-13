import { ComponentProps, CSSProperties } from "react";
import css from "./index.module.scss";
import clsx from "clsx";

type TextInputProps = {
  hasBorder?: boolean;
  isError?: boolean;
} & ComponentProps<"input">;

export const TextInput = (props: TextInputProps) => {
  const { hasBorder = true, isError = false, ...rest } = props;

  const style = {
    "--border-color": "gray",
    "--border-color-error": "red",
  } as CSSProperties;

  return (
    <input
      className={clsx(
        css.input,
        hasBorder && css["input--has-border"],
        isError && css["input--has-border--error"],
      )}
      style={style}
      type="text"
      {...rest}
    />
  );
};
