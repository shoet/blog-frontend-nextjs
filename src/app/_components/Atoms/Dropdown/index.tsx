import type { ComponentProps } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";

export type DropdownOption = {
  value: any;
  label: string;
};

type DropdownProps = {
  options: DropdownOption[];
  placeholder?: string;
} & ComponentProps<"select">;

export const Dropdown = (props: DropdownProps) => {
  const {
    options,
    placeholder = "--------------------------",
    ...rest
  } = props;
  return (
    <div className="relative">
      <select className={clsx(
        "relative appearance-none",
        "px-2 py-0",
        "border border-gray-300 border-solid",
        "rounded-md",
        "h-[40px] w-full",
      )}
        {...rest}
      >
        {[{ value: null, label: placeholder }, ...options].map((opt) => {
          return (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          );
        })}
      </select>
      <div className={styles.selectIcon} />
    </div>
  )
}
