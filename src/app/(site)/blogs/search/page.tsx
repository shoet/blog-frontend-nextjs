import { ResolvingMetadata } from "next";

type SearchPageProps = {
  params: {};
  searchParams: {
    tag?: string;
    keyword?: string;
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

const SearchPage = (props: SearchPageProps) => {
  const { tag, keyword } = props.searchParams;

  return (
    <div>
      tag: {tag}, keyword: {keyword}
    </div>
  );
};

export default SearchPage;
