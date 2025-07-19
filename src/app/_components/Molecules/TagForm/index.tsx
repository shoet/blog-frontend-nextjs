"use client";
import type { ComponentProps, CSSProperties } from "react";
import { theme } from "@/themes";
import { useTagForm } from "./useTagForm";
import { CloseableBadge } from "../CloseableBadge";
import clsx from "clsx";

type TagFromProps = {
  tags: string[];
  onSubmit?: (text: string) => void;
  onClickCloseTag?: (tag: string) => void;
} & Omit<ComponentProps<"input">, "onSubmit">;

export const TagForm = (props: TagFromProps) => {
  const { tags, onSubmit, onClickCloseTag, ...rest } = props;
  const { inputRef, onKeyDownEnter } = useTagForm({
    onSubmit,
  });

  const style = {
    "--border-color": theme.colors.border,
  } as CSSProperties;

  return (
    <div
      className={clsx(
        "flex flex-start flex-row gap-2 p-2",
        "rounded-md border border-[var(--border-color)] border-solid",
      )}
      style={style}
    >
      <div className={clsx(
        "flex flex-row justify-center gap-2",
      )}>
        {tags.map((tag) => {
          return (
            <CloseableBadge
              key={tag}
              variant="black"
              onClickClose={() => onClickCloseTag?.(tag)}
            >
              {tag}
            </CloseableBadge>
          );
        })}
      </div>
      <input
        type="text"
        className={clsx("w-full border-none outline-none")}
        ref={inputRef}
        onKeyDown={onKeyDownEnter}
        {...rest}
      />
    </div>
  );
};
