import { getAPIPath, handleFailed, handleSuccess } from ".";

export async function getUsersMe(authToken: string) {
  return fetch(getAPIPath("/auth/signin/me"), {
    method: "GET",
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
