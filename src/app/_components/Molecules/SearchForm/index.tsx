"use client";
import type { ComponentProps, CSSProperties } from "react";
import { theme } from "@/themes";
import { IconGlass } from "../../Atoms/Icon";
import { useSearchForm } from "./useSearchForm";
import clsx from "clsx";

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
    <div
      className={clsx(
        "flex flex-row items-center px-2 py-1",
        "rounded-md border border-[var(--border-color)] border-solid",
      )}
      style={style}>
      <input
        type="text"
        className={clsx(
          "w-full border-none outline-none placeholder:text-[--placeholder-color]",
        )}
        ref={inputRef}
        onKeyDown={handleOnKeydownInput}
        {...rest}
      />
      <button
        type="button"
        className="cursor-pointer"
        onClick={handleOnClickButton}>
        <IconGlass size="sm" color={theme.colors.placeholder} />
      </button>
    </div>
  );
};
