import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

export async function toHTML(markdown: string): Promise<string> {
  const htmlText = await unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeStringify) // Convert AST into serialized HTML
    .process(markdown);

  return htmlText.toString();
}

// aタグにtarget="_blank"を追加する関数
export function addLinkTargetBlank(html: string): string {
  const regex = /<a href="(.*?)"/g;
  const replacer = (_: string, p1: string) =>
    `<a href="${p1}" target="_blank" rel="noopener noreferrer"`;
  return html.replace(regex, replacer);
}
