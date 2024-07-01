import { ComponentProps, CSSProperties } from "react";
import css from "./index.module.scss";

type SpacerProps = { width?: number; height?: number } & ComponentProps<"div">;

export const Spacer = (props: SpacerProps) => {
  const { width, height, ...rest } = props;
  var style: CSSProperties;
  if (width) {
    style = { width: `${width}px` };
  } else {
    style = { height: `${height}px` };
  }
  return <div {...rest} className={css.spacer} style={style} />;
};
