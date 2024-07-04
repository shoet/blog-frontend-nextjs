import { getTags } from "@/services/getTags";
import { Badge } from "../../Atoms/Badge";
import css from "./index.module.scss";

export const TagsContainer = async () => {
  const tags = await getTags();
  return (
    <div className={css.tagsContainer}>
      {tags.map((t) => {
        return <Badge key={t.id}>{t.name}</Badge>;
      })}
    </div>
  );
};
