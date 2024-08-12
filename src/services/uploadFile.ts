import { handleFailed, handleSuccess } from ".";

type UploadFileForThumbnailResponse = {
  putURL: string;
};

export async function uploadFileForThumbnail(
  file: File,
): Promise<UploadFileForThumbnailResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("content-type", file.type);
  return fetch("/api/files/thumbnail", { method: "POST", body: formData })
    .then(handleSuccess)
    .catch(handleFailed);
}

type UploadFileForContentResponse = {
  putURL: string;
};

export async function uploadFileForContent(
  file: File,
): Promise<UploadFileForContentResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("content-type", file.type);
  return fetch("/api/files/content", { method: "POST", body: formData })
    .then(handleSuccess)
    .catch(handleFailed);
}
