"use client";
import { CSSProperties, useState } from "react";
import styles from "./index.module.scss";
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
    onChangeToggle && onChangeToggle(newStatus);
  };

  const style = {
    "--switch-color-active": activeColor,
    "--switch-color-inactive": baseColor,
  } as CSSProperties;
  return (
    <div
      className={clsx(
        styles.toggle,
        styles[`toggle-${status ? "active" : "inactive"}`],
      )}
      style={style}
      onClick={() => handleOnClickToggle()}
    >
      <div className={styles.toggleBackground}>
        <div
          className={clsx(
            styles.switch,
            styles[`switchPosition-${status ? "active" : "inactive"}`],
          )}
        />
      </div>
    </div>
  );
};
