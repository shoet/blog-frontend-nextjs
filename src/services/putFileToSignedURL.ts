import { handleFailed } from ".";

export async function putFileToSignedURL(signedURL: string, blob: Blob) {
  return fetch(signedURL, {
    method: "PUT",
    body: blob,
    headers: {
      "Content-Type": blob.type,
    },
  }).catch(handleFailed);
}
