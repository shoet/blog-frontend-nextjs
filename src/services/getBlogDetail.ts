import { Blog } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";

export async function getBlogDetail(ID: number): Promise<Blog> {
  return fetch(getAPIPath(`/blogs/${ID}`), { method: "GET" })
    .then(handleSuccess)
    .catch(handleFailed);
}
