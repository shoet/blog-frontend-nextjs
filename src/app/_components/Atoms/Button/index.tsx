import { ComponentProps, CSSProperties } from "react";
import css from "./index.module.scss";
import { theme } from "@/themes";

type ButtonProps = { variant: ButtonVariants } & ComponentProps<"button">;

type ButtonVariants = "primary" | "secondary" | "secondaryDark";

const ButtonStyle: { [key in ButtonVariants]: CSSProperties } = {
  primary: {
    "--background-color": theme.colors.primary,
    "--text-color": theme.colors.white,
    "--border-color": theme.colors.primary,
    "--focus-color": theme.colors.primaryDark,
    "--focus-border-color": theme.colors.primaryDark,
  } as CSSProperties,
  secondary: {
    "--background-color": theme.colors.secondary,
    "--text-color": theme.colors.black,
    "--border-color": theme.colors.black,
    "--focus-color": theme.colors.secondaryDark,
    "--focus-border-color": theme.colors.black,
  } as CSSProperties,
  secondaryDark: {
    "--background-color": theme.colors.secondaryDark,
    "--text-color": theme.colors.black,
    "--focus-color": "gray",
    "--focus-border-color": theme.colors.black,
  } as CSSProperties,
};

export const Button = (props: ButtonProps) => {
  const { variant = "primary", ...rest } = props;

  const style = ButtonStyle[variant];

  return <button className={css.buttonBase} style={style} {...rest} />;
};
