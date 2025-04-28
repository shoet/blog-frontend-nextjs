import { getAPIPath, handleFailed, handleSuccess } from ".";

type GetUserProfileResponse = {
  userProfileId: number;
  userId: number;
  nickname: string;
  avatarImageFileURL?: string;
  bio?: string;
};

export async function getUserProfile(
  userId: number,
): Promise<GetUserProfileResponse> {
  const urlParams = new URLSearchParams();
  urlParams.append("user_id", userId.toString());
  const url = getAPIPath(`/user_profile?${urlParams.toString()}`);
  return fetch(url, { method: "GET" }).then(handleSuccess).catch(handleFailed);
}
