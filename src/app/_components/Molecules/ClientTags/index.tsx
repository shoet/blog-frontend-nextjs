"use client";
import type { Tag } from "@/types/api";
import { theme } from "@/themes";
import { Badge } from "../../Atoms/Badge";
import { useRouter } from "next/navigation";
import clsx from "clsx";

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
    <div className={clsx("flex flex-wrap gap-1")}>
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
