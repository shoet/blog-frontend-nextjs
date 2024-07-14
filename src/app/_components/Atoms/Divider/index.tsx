import { CSSProperties } from "react";
import css from "./index.module.scss";

export const Divider = (props: { width?: number; height?: number }) => {
  const { width = "1px", height = "1px" } = props;
  const style = {
    "--height": height,
    "--width": width,
  } as CSSProperties;
  return <div className={css.divider} style={style} />;
};
