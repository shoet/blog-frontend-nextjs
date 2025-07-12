import type { Blog } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";
import { getServerSideCookie } from "@/utils/cookie";

export async function editBlog(props: {
  id: number;
  authorID: number;
  title: string;
  content: string;
  description: string;
  thumbnailImageFileURL: string;
  isPublic: boolean;
  tags: string[];
}): Promise<Blog> {
  const {
    id,
    authorID,
    title,
    content,
    description,
    thumbnailImageFileURL,
    isPublic,
    tags,
  } = props;
  const body: { [key: string]: any } = {
    id,
    authorId: authorID,
    title,
    content,
    description,
    thumbnailImageFileName: thumbnailImageFileURL,
    isPublic,
    tags,
  };
  const token = (await getServerSideCookie("authToken"))?.value;
  if (!token) {
    throw new Error("ログインしてください");
  }
  return fetch(getAPIPath(`/blogs/${id}`), {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
