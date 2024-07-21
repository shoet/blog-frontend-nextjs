import { MDXRemote } from "next-mdx-remote/rsc";

/* 未使用
 * いずれはこちらを利用してServerComponentでMarkdownをHTML表示する
 * 参考: https://zenn.dev/yuta_extend/articles/7e1136f549f9da
 * */

export const MDXRenderer = (props: { text: string }) => {
  const { text } = props;

  return <MDXRemote source={text} />;
};
