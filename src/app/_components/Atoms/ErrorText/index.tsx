import type { ComponentProps, CSSProperties } from "react";
import css from "./index.module.scss";
import { theme } from "@/themes";

export const ErrorText = (props: ComponentProps<"div">) => {
  const style = {
    "--text-color": theme.colors.danger,
  } as CSSProperties;
  return <div className={css.errorText} style={style} {...props} />;
};
