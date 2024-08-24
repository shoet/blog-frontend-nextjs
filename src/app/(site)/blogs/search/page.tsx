import { ClientBlogCardList } from "@/app/_components/Molecules/ClientBlogCardList";
import { searchBlogs } from "@/services/searchBlogs";
import { ResolvingMetadata } from "next";
import css from "./page.module.scss";
import { Badge, BadgeProps } from "@/app/_components/Atoms/Badge";
import { ComponentProps } from "react";
import { Spacer } from "@/app/_components/Atoms/Spacer";
import { BLOG_PER_PAGE } from "@/constant";

type SearchPageProps = {
  params: {};
  searchParams: {
    tag?: string;
    keyword?: string;
    page?: number;
  };
};

export const generateMetadata = async (
  props: SearchPageProps,
  parent: ResolvingMetadata,
) => {
  const { title: appTitle } = await parent;
  const { tag, keyword } = props.searchParams;

  var search: string;
  if (keyword) {
    search = keyword;
  }
  // tagがある場合はtagを優先して検索する
  if (tag) {
    search = tag;
  }

  const searchTitle =
    tag || keyword ? `${tag || keyword} の検索結果` : "検索結果";

  return {
    title: `${searchTitle} | ${appTitle?.absolute}`,
    description: searchTitle,
  };
};

const TagOrKeyword = (
  props: { tag?: string; keyword?: string } & ComponentProps<"div">,
) => {
  const { tag, keyword, ...rest } = props;
  const result = tag || keyword;
  var badgeStyle: BadgeProps = {};
  if (props.tag) {
    badgeStyle.backgroundColor = "black";
    badgeStyle.color = "white";
  }
  if (props.keyword) {
    badgeStyle.backgroundColor = "pink";
    badgeStyle.color = "white";
  }
  return (
    <div {...rest}>
      <span className={css.SearchResultDescription}>Searched by tag:</span>
      <Badge {...badgeStyle}>{result}</Badge>
    </div>
  );
};

const SearchPage = async (props: SearchPageProps) => {
  const { tag, keyword, page = 1 } = props.searchParams;

  const { blogs, totalCount } = await searchBlogs({ tag, keyword, limit: 10 });

  return (
    <div className={css.searchPage}>
      <TagOrKeyword className={css.description} tag={tag} keyword={keyword} />
      <Spacer height={20} />
      <ClientBlogCardList
        blogs={blogs}
        totalItems={totalCount}
        currentPage={page}
        itemsPerPage={BLOG_PER_PAGE}
      />
    </div>
  );
};

export default SearchPage;
