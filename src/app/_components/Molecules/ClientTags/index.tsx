"use client";
import { Tag } from "@/types/api";
import css from "./index.module.scss";
import { theme } from "@/themes";
import { Badge } from "../../Atoms/Badge";
import { useRouter } from "next/navigation";

type TagsProps = {
  tags: Tag[];
};

export const ClientTags = (props: TagsProps) => {
  const { tags } = props;

  const router = useRouter();

  const handleOnClickTag = (tag: Tag) => {
    router.push(`/blogs/search?tag=${tag.name}`);
  };

  return (
    <div className={css.tagsContainer}>
      {tags.map((t) => {
        return (
          <Badge
            key={t.id}
            focusColor={theme.colors.focusPurple}
            onClick={() => handleOnClickTag(t)}
          >
            {t.name}
          </Badge>
        );
      })}
    </div>
  );
};
