import { type CSSProperties, useState } from "react";
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
    switchColor = theme.colors.secondaryGrayMore,
    defaultStatus = "left",
  } = props;
  const [status, setStatus] = useState<ToggleStatus>(defaultStatus);
  const handleOnClickToggle = () => {
    const newStatus = status === "left" ? "right" : "left";
    setStatus(newStatus);
    onChangeToggle?.(newStatus);
  };

  const style = {
    "--active-text-color": switchColor,
    "--background-color": switchColor,
  } as CSSProperties;

  return (
    <button
      type="button"
      onClick={handleOnClickToggle}
      style={style}
      className={clsx(
        "bg-[var(--background-color)]",
        "h-[30px] w-full rounded-full p-1",
        "cursor-pointer outline-none",
      )}
    >
      <div
        className={clsx(
          "relative flex h-full flex-row items-center justify-center",
        )}
      >
        <div
          className={clsx(
            "absolute h-full w-1/2 rounded-full bg-white text-center transition-transform duration-300 ease-in-out",
            status === "left" ? "-translate-x-1/2" : "translate-x-1/2",
          )}
        ></div>
        <div
          className={clsx(
            "absolute left-0 w-1/2 text-center font-bold",
            "transition-colors duration-300 ease-linear",
            status === "left"
              ? "text-[var(--active-text-color)]"
              : "text-white",
          )}
        >
          {leftText}
        </div>
        <div
          className={clsx(
            "absolute right-0 w-1/2 text-center font-bold",
            "transition-colors duration-300 ease-linear",
            status === "right"
              ? "text-[var(--active-text-color)]"
              : "text-white",
          )}
        >
          {rightText}
        </div>
      </div>
    </button>
  );
};
