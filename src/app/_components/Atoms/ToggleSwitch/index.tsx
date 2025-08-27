"use client";
import { type CSSProperties, useState } from "react";
import clsx from "clsx";
import { theme } from "@/themes";

type Props = {
  baseColor?: string;
  activeColor?: string;
  onChangeToggle?(active: boolean): void;
  defaultStatus?: boolean;
};

export const ToggleSwitch = (props: Props) => {
  const {
    onChangeToggle,
    baseColor = theme.colors.secondaryGrayMore,
    activeColor = theme.colors.primary,
    defaultStatus = false,
  } = props;
  const [status, setStatus] = useState<boolean>(defaultStatus);
  const handleOnClickToggle = () => {
    const newStatus = !status;
    setStatus(newStatus);
    onChangeToggle?.(newStatus);
  };

  const style = {
    "--switch-color-active": activeColor,
    "--switch-color-inactive": baseColor,
  } as CSSProperties;

  return (
    <button
      type="button"
      onClick={handleOnClickToggle}
      style={style}
      className={clsx(
        "relative h-[30px] w-full rounded-full p-1 outline-none cursor-pointer",
        "ease transition-colors duration-300",
        status
          ? "bg-[var(--switch-color-active)]"
          : "bg-[var(--switch-color-inactive)]",
      )}
    >
      <div
        className={clsx(
          "h-full w-1/2 rounded-full bg-white",
          "ease transition-transform duration-300",
          status ? "translate-x-full" : "",
        )}
      />
    </button>
  );
};
