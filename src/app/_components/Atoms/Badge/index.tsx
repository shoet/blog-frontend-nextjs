import { clsx } from "clsx";
import styles from "./index.module.scss";
import React, { type ComponentProps, type CSSProperties } from "react";

export type BadgeProps = {
  color?: string;
  backgroundColor?: string;
  focusColor?: string;
  onClick?: () => void;
} & ComponentProps<"span">;

export const Badge = (props: BadgeProps) => {
  const {
    color = "white",
    backgroundColor = "black",
    focusColor,
    onClick,
    children,
    ...rest
  } = props;

  const style = {
    "--container-color": color,
    "--container-bg-color": backgroundColor,
    "--container-focus-color": focusColor,
  } as CSSProperties;

  return (
    // biome-ignore lint: lint/a11y/useKeyWithClickEvents
    <span
      className={clsx(styles.container, focusColor && styles.containerFocus)}
      style={style}
      onClick={onClick}
      {...rest}
    >
      {children}
    </span>
  );
};
