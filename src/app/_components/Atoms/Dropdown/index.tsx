import { ComponentProps } from "react";
import styles from "./index.module.scss";

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
    <div className={styles.dropdownWrapper}>
      <select className={styles.dropdown} {...rest}>
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
  );
};
