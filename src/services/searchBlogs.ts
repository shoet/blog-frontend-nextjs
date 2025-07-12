import type { Blog } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";
import { BLOG_PER_PAGE } from "@/constant";

type SearchBlogsResponse = {
  blogs: Blog[];
  prevEOF: boolean;
  nextEOF: boolean;
  totalCount: number;
};

export async function searchBlogs(props: {
  tag?: string;
  keyword?: string;
  limit?: number;
  page?: number;
}): Promise<SearchBlogsResponse> {
  const { tag, keyword, page = 1, limit = BLOG_PER_PAGE } = props;

  const searchParams = new URLSearchParams();

  searchParams.append("limit", limit.toString());
  searchParams.append("page", page.toString());
  if (tag) searchParams.append("tag", tag);
  if (keyword) searchParams.append("keyword", keyword);

  return fetch(getAPIPath(`/v2/blogs?${searchParams.toString()}`))
    .then(handleSuccess)
    .catch(handleFailed);
}
