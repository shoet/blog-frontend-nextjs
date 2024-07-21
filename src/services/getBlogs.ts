import { Blog } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";

type GetBlogsResponse = {
  blogs: Blog[];
  prevEOF: boolean;
  nextEOF: boolean;
};

export async function getBlogs({
  limit = 10,
  tag,
  keyword,
}: {
  limit?: number;
  tag?: string;
  keyword?: string;
}): Promise<GetBlogsResponse> {
  const urlParams = new URLSearchParams();
  urlParams.append("limit", limit.toString());
  if (tag) {
    urlParams.append("tag", tag);
  }
  if (keyword) {
    urlParams.append("keyword", keyword);
  }
  return fetch(getAPIPath(`/blogs?${urlParams.toString()}`), { method: "GET" })
    .then(handleSuccess)
    .catch(handleFailed);
}
