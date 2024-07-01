"use client";
import { Tag } from "@/types/api";
import css from "./index.module.scss";
import { Badge } from "../../Atoms/Badge";
import { ComponentProps, CSSProperties } from "react";
import { theme } from "@/themes";
import { useTagForm } from "./useTagForm";

type TagFromProps = {
  tags: Tag[];
  onSubmit?: (text: string) => void;
} & Omit<ComponentProps<"input">, "onSubmit">;

export const TagForm = (props: TagFromProps) => {
  const { tags, onSubmit, ...rest } = props;
  const { inputRef, onKeyDownEnter } = useTagForm({ onSubmit });

  const style = {
    "--border-color": theme.colors.border,
  } as CSSProperties;

  return (
    <div className={css.tagForm} style={style}>
      <div className={css.tags}>
        {tags.map((tag) => {
          return (
            <Badge key={tag.id} color="white" backgroundColor="black">
              {tag.name}
            </Badge>
          );
        })}
      </div>
      <input type="text" ref={inputRef} onKeyDown={onKeyDownEnter} {...rest} />
    </div>
  );
};
