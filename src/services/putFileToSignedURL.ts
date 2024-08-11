import { handleFailed } from ".";

export async function putFileToSignedURL(
  signedURL: string,
  file: File,
  contentType: string,
) {
  const formData = new FormData();
  formData.append("file", file);
  return fetch(signedURL, {
    method: "PUT",
    body: formData,
    headers: { "Content-Type": contentType },
  }).catch(handleFailed);
}
