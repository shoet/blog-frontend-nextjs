import type { Blog } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";
import { getServerSideCookie } from "@/utils/cookie";

export async function postBlog(
  props: Omit<Blog, "id" | "created" | "modified">,
): Promise<Blog> {
  const token = (await getServerSideCookie("authToken"))?.value;
  if (!token) {
    throw new Error("ログインしてください");
  }
  const body: { [key: string]: any } = { ...props };
  return fetch(getAPIPath("/blogs"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
