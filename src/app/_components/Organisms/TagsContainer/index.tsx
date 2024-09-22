import { getTags } from "@/services/getTags";
import { ClientTags } from "../../Molecules/ClientTags";

export const TagsContainer = async () => {
  const tags = await getTags();
  await new Promise((resolve) => setTimeout(resolve, 1000 * 5));
  return <ClientTags tags={tags} />;
};
