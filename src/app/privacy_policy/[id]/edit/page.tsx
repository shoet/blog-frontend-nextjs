import { authGuard } from "@/middleware";
import { getPrivacyPolicy } from "@/services/privacyPolicy";
import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";
import { ClientPrivacyPolicyEditor } from "../../_components/ClientPrivacyPolicyEditor";
import { IconTrash } from "@/app/_components/Atoms/Icon";

type PrivacyPolicyProps = {
  params: Promise<{
    id: string;
  }>;
};

export const generateMetadata = async (
  _: PrivacyPolicyProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title } = await parent;
  return {
    title: `プライバシーポリシー | ${title?.absolute}`,
    description: "プライバシーポリシー",
  };
};

export default async function Page(props: PrivacyPolicyProps) {
  if (!(await authGuard())) {
    return redirect("/admin/signin");
  }
  const { id } = await props.params;
  const privacyPolicy = await getPrivacyPolicy(id);
  return (
    <div>
      <div>プライバシーポリシーの編集</div>
      <ClientPrivacyPolicyEditor privacyPolicy={privacyPolicy} />
    </div>
  );
}
