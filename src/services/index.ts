import { API_BASE_URL } from "@/constant";

export const getAPIPath = (path: string) => `${API_BASE_URL}${path}`;
export class FetchError extends Error {
  status: number;
  statusText: string;
  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.status = status;
    this.statusText = statusText;
  }
}

export const handleSuccess = async (response: Response) => {
  if (!response.ok) {
    const body = await response.json();
    throw new FetchError(body.message, response.status, response.statusText);
  }
  return await response.json();
};

export const handleFailed = (error: unknown) => {
  if (error instanceof FetchError) {
    console.warn("error: ", error.message);
  } else {
    console.warn("unexpected error: ", error);
  }
};
