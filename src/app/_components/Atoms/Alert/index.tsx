import type { ComponentProps, CSSProperties } from "react";
import { IconXmark } from "../Icon";
import clsx from "clsx";

type AlertVariant = "info" | "warn" | "error" | "success" | "black"

const ColorVariants: Record<AlertVariant, string> = {
  "info": "bg-blue-300 text-white",
  "warn": "bg-orange-300 text-white",
  "error": "bg-red-300 text-white",
  "success": "bg-green-300 text-white",
  "black": "bg-black text-white",
}

type AlertProps = {
  variant?: AlertVariant
  borderColor?: string;
  onClick?: () => void;
} & ComponentProps<"div">;

export const Alert = (props: AlertProps) => {
  const {
    variant = "black",
    borderColor,
    onClick,
    children,
    ...rest
  } = props;

  const style = {
    "--border-color": borderColor
  } as CSSProperties;

  return (
    <div
      className={clsx(
        "flex flex-row justify-between rounded-md px-2 py-1 font-bold",
        ColorVariants[variant],
        {
          "border-1 border-[var(--border-color)] border-solid": borderColor,
        }
      )}
      style={style}
      {...rest}
    >
      <div>{children}</div>
      <IconXmark onClick={onClick} focus />
    </div>
  );
};
