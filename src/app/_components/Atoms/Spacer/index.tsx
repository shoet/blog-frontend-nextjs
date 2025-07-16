import type { ComponentProps, CSSProperties } from "react";

type SpacerProps = { width?: number; height?: number } & ComponentProps<"div">;

export const Spacer = (props: SpacerProps) => {
  const { width, height, ...rest } = props;
  const style = {
    "--height": `${height}px`,
    "--width": `${width}px`,
  } as CSSProperties
  return <div
    {...rest}
    className={`h-[var(--height)] w-[var(--width)] shrink-0`}
    style={style}
  />;
};
