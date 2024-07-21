import { Blog } from "@/types/api";
import { getAPIPath, handleFailed, handleSuccess } from ".";

type SearchBlogsResponse = {
  blogs: Blog[];
  prevEOF: boolean;
  nextEOF: boolean;
};

export async function searchBlogs(props: {
  tag?: string;
  keyword?: string;
  limit?: number;
}): Promise<SearchBlogsResponse> {
  const { tag, keyword, limit = 10 } = props;

  const searchParams = new URLSearchParams();

  searchParams.append("limit", limit.toString());
  if (tag) searchParams.append("tag", tag);
  if (keyword) searchParams.append("keyword", keyword);

  return fetch(getAPIPath(`/blogs?${searchParams.toString()}`))
    .then(handleSuccess)
    .catch(handleFailed);
}
