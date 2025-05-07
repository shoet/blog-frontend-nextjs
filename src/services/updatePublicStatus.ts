import { Blog } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";
import { getServerSideCookie } from "@/utils/cookie";

export async function updatePublicStatus(
  blogId: number,
  isPublic: boolean,
): Promise<Blog> {
  const body: { [key: string]: any } = {
    blogId: blogId,
    isPublic: isPublic,
  };
  const token = (await getServerSideCookie("authToken"))?.value;
  if (!token) {
    throw new Error("ログインしてください");
  }
  console.log(JSON.stringify(body));
  return fetch(getAPIPath(`/update_public_status`), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
