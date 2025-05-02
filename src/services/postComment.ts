import { getServerSideCookie } from "@/utils/cookie";
import { getAPIPath, handleFailed, handleSuccess } from ".";

type PostCommentRequest = {
  userId?: number;
  clientId?: string;
  content: string;
  threadCommentId?: number;
};

type PostCommentResponse = {
  commentId: number;
};

export async function postComment(
  blogId: number,
  content: string,
  userId?: number,
  clientId?: string,
  threadCommentId?: number,
): Promise<PostCommentResponse> {
  const requestBody: PostCommentRequest = {
    content,
    userId: userId,
    clientId: clientId,
    threadCommentId: threadCommentId,
  };
  const headers: { [key: string]: string } = {};
  if (userId) {
    const token = await getServerSideCookie("authToken");
    if (token) {
      headers.Authorization = `Bearer ${token.value}`;
    }
  }

  return fetch(getAPIPath(`/blogs/${blogId}/comments`), {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { ...headers },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
