"use client";
import { useRouter } from "next/navigation";
import { SearchForm } from "../../Molecules/SearchForm";

export const ClientKeywordSearchForm = () => {
  const navigation = useRouter();
  const handleOnSubmitKeyword = (keyword: string) => {
    navigation.push(`/blogs/search?keyword=${keyword}`);
  };
  return <SearchForm placeholder="Search" onSubmit={handleOnSubmitKeyword} />;
};
