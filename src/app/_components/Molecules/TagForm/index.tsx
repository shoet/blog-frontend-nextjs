"use client";
import css from "./index.module.scss";
import type { ComponentProps, CSSProperties } from "react";
import { theme } from "@/themes";
import { useTagForm } from "./useTagForm";
import { CloseableBadge } from "../CloseableBadge";

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
    <div className={css.tagForm} style={style}>
      <div className={css.tags}>
        {tags.map((tag) => {
          return (
            <CloseableBadge
              key={tag}
              variant="black"
              onClickClose={() => onClickCloseTag && onClickCloseTag(tag)}
            >
              {tag}
            </CloseableBadge>
          );
        })}
      </div>
      <input type="text" ref={inputRef} onKeyDown={onKeyDownEnter} {...rest} />
    </div>
  );
};
