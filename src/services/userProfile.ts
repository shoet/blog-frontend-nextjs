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

export async function updateUserProfile(
  userId: number,
  field: {
    nickname: string;
    avatarImageURL?: string;
    bio?: string;
  },
): Promise<GetUserProfileResponse> {
  const body: { [key: string]: any } = {
    userId: userId,
    nickname: field.nickname,
  };
  if (field.avatarImageURL) {
    body["avatarImageUrl"] = field.avatarImageURL;
  }
  if (field.bio) {
    body["biography"] = field.bio;
  }
  const url = getAPIPath(`/user_profile`);
  console.log("### updateUsreProfile");
  return fetch(url, { method: "PUT" }).then(handleSuccess).catch(handleFailed);
}
