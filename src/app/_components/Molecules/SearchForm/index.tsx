"use client";
import { ComponentProps, CSSProperties } from "react";
import styles from "./index.module.scss";
import { theme } from "@/themes";
import { IconGlass } from "../../Atoms/Icon";
import { useSearchForm } from "./useSearchForm";

type SearchFormProps = {
  onSubmit?: (keyword: string) => void;
} & Omit<ComponentProps<"input">, "onSubmit">;

export const SearchForm = (props: SearchFormProps) => {
  const { onSubmit, ...rest } = props;
  const { inputRef, handleOnKeydownInput, handleOnClickButton } = useSearchForm(
    { onSubmit },
  );

  const style = {
    "--placeholder-color": theme.colors.placeholder,
    "--border-color": theme.colors.border,
  } as CSSProperties;

  return (
    <div className={styles.searchForm} style={style}>
      <input
        type="text"
        ref={inputRef}
        onKeyDown={handleOnKeydownInput}
        {...rest}
      />
      <button type="reset" onClick={handleOnClickButton}>
        <IconGlass size="sm" color={theme.colors.placeholder} />
      </button>
    </div>
  );
};
