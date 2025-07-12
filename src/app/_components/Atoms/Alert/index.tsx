import type { ComponentProps, CSSProperties } from "react";
import styles from "./index.module.scss";
import { IconXmark } from "../Icon";

type AlertProps = {
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  onClick?: () => void;
} & ComponentProps<"div">;

export const Alert = (props: AlertProps) => {
  const {
    backgroundColor = "black",
    color = "white",
    borderColor,
    onClick,
    children,
    ...rest
  } = props;

  const containerDecoration = {
    backgroundColor: backgroundColor,
    color: color,
  } as CSSProperties;

  if (borderColor) {
    containerDecoration.border = `1px solid ${borderColor}`;
  }

  return (
    <div className={styles.container} style={containerDecoration} {...rest}>
      <div>{children}</div>
      <IconXmark onClick={onClick} focus />
    </div>
  );
};
