import { Blog } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";
import { getServerSideCookie } from "@/utils/cookie";

export async function getBlogDetail(ID: number): Promise<Blog> {
  return fetch(getAPIPath(`/blogs/${ID}`), { method: "GET" })
    .then(handleSuccess)
    .catch(handleFailed);
}

export async function getPrivateBlogDetail(ID: number): Promise<Blog> {
  const token = getServerSideCookie("authToken")?.value;
  if (!token) {
    throw new Error("ログインしてください");
  }
  return fetch(getAPIPath(`/blogs/${ID}`), {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
