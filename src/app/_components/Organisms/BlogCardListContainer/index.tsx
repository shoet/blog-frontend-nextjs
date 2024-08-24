import { getBlogs } from "@/services/getBlogs";
import { ClientBlogCardList } from "../../Molecules/ClientBlogCardList";
import { BLOG_PER_PAGE } from "@/constant";

export const BlogCardListContainer = async (props: { page?: number }) => {
  const { page = 1 } = props;
  const response = await getBlogs({ limit: BLOG_PER_PAGE, page: page });
  const { blogs, totalCount } = response;
  return (
    <ClientBlogCardList
      blogs={blogs}
      totalItems={totalCount}
      currentPage={page}
      itemsPerPage={BLOG_PER_PAGE}
    />
  );
};
