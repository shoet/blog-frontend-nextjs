import type { CSSProperties } from "react";
import { theme } from "@/themes";
import clsx from "clsx";

export const Divider = (props: { width?: number; height?: number }) => {
  const { width = "1", height = "1" } = props;
  const style = {
    "--height": height,
    "--width": width,
    "--color": theme.colors.secondaryGrayMore,
  } as CSSProperties;
  return <div className={clsx(
    "border border-[var(--color)] border-solid",
    "h-[var(--height)] w-[var(--width)]",
  )} style={style} />;
};
