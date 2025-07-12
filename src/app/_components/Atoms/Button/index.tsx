import type { ComponentProps, CSSProperties } from "react";
import css from "./index.module.scss";
import { theme } from "@/themes";
import clsx from "clsx";

type ButtonProps = {
  variant: ButtonVariants;
  round?: boolean;
} & ComponentProps<"button">;

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
    "--text-color": theme.colors.darkGray,
    "--border-color": theme.colors.secondaryGray,
    "--focus-color": theme.colors.secondaryDark,
    "--focus-border-color": theme.colors.secondaryGray,
  } as CSSProperties,
  secondaryDark: {
    "--background-color": theme.colors.secondaryGrayMore,
    "--text-color": theme.colors.white,
    "--focus-color": "gray",
    "--focus-border-color": theme.colors.black,
  } as CSSProperties,
};

export const Button = (props: ButtonProps) => {
  const { variant = "primary", round = false, ...rest } = props;

  const style = ButtonStyle[variant];

  return (
    <button
      className={clsx(css.buttonBase, round && css.round)}
      style={style}
      {...rest}
    />
  );
};
