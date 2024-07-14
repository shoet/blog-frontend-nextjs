import { getTags } from "@/services/getTags";
import { ClientTags } from "../../Molecules/ClientTags";

export const TagsContainer = async () => {
  const tags = await getTags();
  return <ClientTags tags={tags} />;
};
