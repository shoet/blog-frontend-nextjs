import type { CSSProperties } from "react";
import css from "./index.module.scss";
import { theme } from "@/themes";

export const Divider = (props: { width?: number; height?: number }) => {
  const { width = "1", height = "1" } = props;
  const style = {
    "--height": height,
    "--width": width,
    "--color": theme.colors.secondaryGrayMore,
  } as CSSProperties;
  return <div className={css.divider} style={style} />;
};
