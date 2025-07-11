import type { Comment } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";

type GetCommentsResponse = {
  comments: Comment[];
};
export async function getComments(
  blogId: number,
): Promise<GetCommentsResponse> {
  return fetch(getAPIPath(`/blogs/${blogId}/comments`), {
    method: "GET",
    next: { tags: ["fetch_comment"] },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
