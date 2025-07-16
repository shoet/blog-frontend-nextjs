import { API_BASE_URL } from "@/constant";
import { notFound } from "next/navigation";

export const getAPIPath = (path: string) => {
  return `${API_BASE_URL}${path}`;
};
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
    if (error.status === 404) {
      notFound();
    }
  } else if (error instanceof Error) {
    console.warn("error: ", error.message, error.stack);
  } else {
    console.warn("unknown error: ", error);
  }
  throw error;
};
