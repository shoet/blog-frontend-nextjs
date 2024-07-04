import { Tag } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";

export async function getTags(): Promise<Tag[]> {
  return fetch(getAPIPath("/tags"), { method: "GET" })
    .then(handleSuccess)
    .catch(handleFailed);
}
