import type { ComponentProps, CSSProperties } from "react";
import { theme } from "@/themes";

export const ErrorText = (props: ComponentProps<"div">) => {
  const style = {
    "--text-color": theme.colors.danger,
  } as CSSProperties;
  return <div className="text-[var(--text-color)] text-sm" {...props} style={style} />
};
