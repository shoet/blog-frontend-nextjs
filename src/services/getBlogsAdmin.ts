import { Blog } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";
import { getServerSideCookie } from "@/utils/cookie";

type GetBlogsAdminResponse = Blog[];

export async function getBlogsAdmin(props: {
  limit?: number;
}): Promise<GetBlogsAdminResponse> {
  const { limit = 10 } = props;

  const searchParams = new URLSearchParams();
  searchParams.append("limit", limit.toString());

  const token = await getServerSideCookie("authToken");
  if (!token) throw new Error("ログインしていません");
  return fetch(getAPIPath(`/admin/blogs?${searchParams.toString()}`), {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
