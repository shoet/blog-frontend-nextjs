import { getServerSideCookie } from "@/utils/cookie";
import { getAPIPath, handleFailed, handleSuccess } from ".";

type GetSignedURLForThumbnailResponse = {
  signedUrl: string;
  putUrl: string;
};

export async function getSignedURLForThumbnail(
  fileName: string,
): Promise<GetSignedURLForThumbnailResponse> {
  const authToken = await getServerSideCookie("authToken");
  const token = authToken?.value;
  if (!token) {
    throw new Error("ログインしてください");
  }
  const body: { [key: string]: string } = {
    fileName: fileName,
  };
  return fetch(getAPIPath("/files/thumbnail/new"), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}

type GetSignedURLForContentResponse = {
  signedUrl: string;
  putUrl: string;
};

export async function getSignedURLForContent(
  fileName: string,
): Promise<GetSignedURLForContentResponse> {
  const authToken = await getServerSideCookie("authToken");
  const token = authToken?.value;
  if (!token) {
    throw new Error("ログインしてください");
  }
  const body: { [key: string]: string } = {
    fileName: fileName,
  };
  return fetch(getAPIPath("/files/content/new"), {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
