import { CSSProperties, useState } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import { theme } from "@/themes";

type ToggleStatus = "left" | "right";

type Props = {
  leftText: string;
  rightText: string;
  switchColor?: string;
  onChangeToggle?(status: ToggleStatus): void;
  defaultStatus?: ToggleStatus;
};

export const TextToggle = (props: Props) => {
  const {
    leftText,
    rightText,
    onChangeToggle,
    switchColor = theme.colors.focusGreen,
    defaultStatus = "left",
  } = props;
  const [status, setStatus] = useState<ToggleStatus>(defaultStatus);
  const handleOnClickToggle = () => {
    const newStatus = status == "left" ? "right" : "left";
    setStatus(newStatus);
    onChangeToggle && onChangeToggle(newStatus);
  };

  const style = {
    "--switch-color": switchColor,
  } as CSSProperties;
  return (
    <div
      className={styles.toggle}
      style={style}
      onClick={() => handleOnClickToggle()}
    >
      <div className={styles.toggleBackground}>
        <div className={clsx(styles.toggleTextWrapper, styles.toggleLeft)}>
          <div
            className={clsx(
              styles.text,
              status === "left" ? styles.active : styles.notActive,
            )}
          >
            {leftText}
          </div>
        </div>
        <div className={clsx(styles.toggleTextWrapper, styles.toggleRight)}>
          <div
            className={clsx(
              styles.text,
              status === "right" ? styles.active : styles.notActive,
            )}
          >
            {rightText}
          </div>
        </div>
        <div
          className={clsx(styles.switch, styles[`switchPosition-${status}`])}
        />
      </div>
    </div>
  );
};
