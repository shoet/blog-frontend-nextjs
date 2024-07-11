import { getAPIPath, handleFailed, handleSuccess } from ".";

type LoginResponse = {
  authToken: string;
};

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const body: { [key: string]: any } = {
    email: email,
    password: password,
  };
  return fetch(getAPIPath("/auth/signin"), {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
