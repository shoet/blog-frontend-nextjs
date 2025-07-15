import type { ComponentProps, CSSProperties } from "react";
import { theme } from "@/themes";
import clsx from "clsx";

type ButtonProps = {
  variant: ButtonVariants;
  round?: boolean;
} & ComponentProps<"button">;

type ButtonVariants = "primary" | "secondary" | "secondaryDark";

type ButtonStyle = {
  backgroundColor: string
  foregroundColor: string
  borderColor?: string
  pseudo?: {
    hover?: {
      backgroundColor?: string
      foregroundColor?: string
    }
    disabled?: {
      backgroundColor?: string
      foregroundColor?: string
    }
  }
}

const ButtonVariants: { [key in ButtonVariants]: ButtonStyle } = {
  "primary": {
    backgroundColor: theme.colors.primary,
    foregroundColor: theme.colors.white,
    borderColor: theme.colors.primary,
    pseudo: {
      disabled: {
        backgroundColor: theme.colors.primary,
        foregroundColor: theme.colors.white,
      },
      hover: {
        backgroundColor: theme.colors.primaryDark,
      }
    }
  },
  "secondary": {
    backgroundColor: theme.colors.secondary,
    foregroundColor: theme.colors.darkGray,
    borderColor: theme.colors.secondaryGray,
    pseudo: {
      disabled: {
        backgroundColor: theme.colors.secondary,
        foregroundColor: theme.colors.darkGray,
      },
      hover: {
        backgroundColor: theme.colors.secondaryDark,
      }
    }
  },
  "secondaryDark": {
    backgroundColor: theme.colors.secondaryGrayMore,
    foregroundColor: theme.colors.white,
    borderColor: theme.colors.secondaryGrayMore,
    pseudo: {
      disabled: {
        backgroundColor: theme.colors.secondaryGrayMore,
        foregroundColor: theme.colors.white,
      },
      hover: {
        backgroundColor: theme.colors.gray,
        foregroundColor: theme.colors.black,
      }
    }
  },
}

export const Button = (props: ButtonProps) => {
  const { variant = "primary", round = false, ...rest } = props;

  const buttonStyle = ButtonVariants[variant]

  return (
    <button
      className={clsx(
        "cursor-pointer px-4 py-2 font-bold",
        clsx("text-[var(--fg-color)]", "bg-[var(--bg-color)]", "border border-[var(--border-color)]"),
        clsx("disabled:cursor-not-allowed", "disabled:bg-[var(--disabled-bg)]"),
        clsx("hover:bg-[var(--hover-bg)]"),
        round ? "rounded-full" : "rounded-md"
      )}
      {...rest}
      style={{
        "--bg-color": buttonStyle.backgroundColor,
        "--fg-color": buttonStyle.foregroundColor,
        "--border-color": buttonStyle.borderColor,
        "--disabled-bg": buttonStyle?.pseudo?.disabled?.backgroundColor,
        "--hover-bg": buttonStyle.pseudo?.hover?.backgroundColor,
      } as CSSProperties}
    />
  )
}
