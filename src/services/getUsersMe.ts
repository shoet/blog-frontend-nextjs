import type { User } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";

export async function getUsersMe(authToken: string): Promise<User> {
  return fetch(getAPIPath("/auth/signin/me"), {
    method: "GET",
    headers: { Authorization: `Bearer ${authToken}` },
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
