import { BlogCardListContainer } from "@/app/_components/Organisms/BlogCardListContainer";
import { Metadata, ResolvingMetadata } from "next";

export const generateMetadata = async (
  _: any,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title } = await parent;
  return {
    title: `直近のブログ一覧 | ${title?.absolute}`,
    description: "直近のブログ一覧",
  };
};

export default async function BlogHomePage(props: {
  searchParams: Promise<{ page: number }>;
}) {
  const { page } = await props.searchParams;
  return <BlogCardListContainer page={page} />;
}
