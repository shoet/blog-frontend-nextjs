"use client";
import { Tag } from "@/types/api";
import css from "./index.module.scss";
import { ComponentProps, CSSProperties } from "react";
import { theme } from "@/themes";
import { useTagForm } from "./useTagForm";
import { CloseableBadge } from "../CloseableBadge";

type TagFromProps = {
  tags: Tag[];
  onSubmit?: (text: string) => void;
  onClickCloseTag?: (tag: Tag) => void;
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
              key={tag.id}
              color="white"
              backgroundColor="black"
              onClickClose={() => onClickCloseTag && onClickCloseTag(tag)}
            >
              {tag.name}
            </CloseableBadge>
          );
        })}
      </div>
      <input type="text" ref={inputRef} onKeyDown={onKeyDownEnter} {...rest} />
    </div>
  );
};