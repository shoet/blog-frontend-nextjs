import { Blog } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";

type GetBlogsResponse = {
  blogs: Blog[];
  prevEOF: boolean;
  nextEOF: boolean;
  totalCount: number;
};

export async function getBlogs({
  page = 1,
  limit = 10,
  tag,
  keyword,
}: {
  page?: number;
  limit?: number;
  tag?: string;
  keyword?: string;
}): Promise<GetBlogsResponse> {
  const urlParams = new URLSearchParams();
  urlParams.append("limit", limit.toString());
  urlParams.append("page", page.toString());
  if (tag) {
    urlParams.append("tag", tag);
  }
  if (keyword) {
    urlParams.append("keyword", keyword);
  }
  return fetch(getAPIPath(`/v2/blogs?${urlParams.toString()}`), {
    method: "GET",
  })
    .then(handleSuccess)
    .catch(handleFailed);
}
