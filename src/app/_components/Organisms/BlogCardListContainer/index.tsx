import { getBlogs } from "@/services/getBlogs";
import { ClientBlogCardList } from "../../Molecules/ClientBlogCardList";

const BLOG_PER_PAGE = 5;

export const BlogCardListContainer = async (props: { page?: number }) => {
  const { page = 1 } = props;
  const response = await getBlogs({ limit: BLOG_PER_PAGE, page: page });
  const { blogs, totalCount } = response;
  const pages = getPagenatorString(totalCount);
  return (
    <ClientBlogCardList
      blogs={blogs}
      pageNubmers={pages}
      currentPage={page.toString()}
    />
  );
};

export function getPagenatorString(count: number) {
  if (count === 0) {
    return [];
  }

  // 切り上げのページ数を取得
  const pages = Math.ceil(count / BLOG_PER_PAGE);

  return Array.from({ length: pages }).map((_, i) => {
    return (i + 1).toString();
  });
}
