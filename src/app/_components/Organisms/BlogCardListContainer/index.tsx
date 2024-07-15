import { getBlogs } from "@/services/getBlogs";
import { ClientBlogCardList } from "../../Molecules/ClientBlogCardList";

export const BlogCardListContainer = async () => {
  const response = await getBlogs({ limit: 10 });
  const blogs = response.blogs;
  return <ClientBlogCardList blogs={blogs} />;
};
