import { getServerSideCookie } from "@/utils/cookie";
import { getAPIPath, handleFailed, handleSuccess } from ".";

export async function deleteBlog(blogID: number) {
  const authToken = await getServerSideCookie("authToken");
  const token = authToken?.value;
  if (!token) {
    throw new Error("ログインしてください");
  }
  return fetch(getAPIPath(`/blogs/${blogID}`), {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
