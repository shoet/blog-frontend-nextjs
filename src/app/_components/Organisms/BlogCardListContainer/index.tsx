import { getBlogs } from "@/services/getBlogs";
import { ClientBlogCardList } from "../../Molecules/ClientBlogCardList";

const BLOG_PER_PAGE = 5;

export const BlogCardListContainer = async (props: { page?: number }) => {
  const { page = 1 } = props;
  const response = await getBlogs({ limit: BLOG_PER_PAGE, page: page });
  const blogs = response.blogs;
  return <ClientBlogCardList blogs={blogs} />;
};
