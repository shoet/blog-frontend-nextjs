import { clsx } from "clsx";
import type { ComponentProps, CSSProperties } from "react";

type BadgeVariant = "black" | "green" | "orange" | "pink";

const ColorVarinats: Record<BadgeVariant, string> = {
  "black": "bg-black text-white",
  "green": "bg-green-500 text-white",
  "orange": "bg-orange-500 text-white",
  "pink": "bg-pink-500 text-white",
}

export type BadgeProps = {
  variant?: BadgeVariant
  focusColor?: string;
  onClick?: () => void;
} & ComponentProps<"button">;

export const Badge = (props: BadgeProps) => {
  const { children, variant = "black", onClick, focusColor, ...rest } = props
  const colorVariant = ColorVarinats[variant]

  const style = {
    "--container-focus-color": focusColor,
  } as CSSProperties;

  return <button
    onClick={onClick}
    className={clsx(`rounded-sm px-1.5 py-0.5 font-bold text-sm ${colorVariant}`, {
      "cursor-pointer": onClick,
      "hover:bg-[var(--container-focus-color)]": focusColor,
    })} style={style} {...rest}>
    {children}
  </button>
}
