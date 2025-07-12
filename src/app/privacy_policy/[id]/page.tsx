import { MarkdownRenderer } from "@/app/_components/Molecules/MarkdownRenderer";
import { getPrivacyPolicy } from "@/services/privacyPolicy";
import type { Metadata } from "next";

type PrivacyPolicyProps = {
  params: Promise<{
    id: string;
  }>;
};

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: `プライバシーポリシー`,
    description: "プライバシーポリシー",
  };
};

export default async function Page(props: PrivacyPolicyProps) {
  const { id } = await props.params;
  const privacyPolicy = await getPrivacyPolicy(id);
  return <MarkdownRenderer markdown={privacyPolicy.content} />;
}
