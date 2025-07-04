import { authGuard } from '@/middleware';
import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';
import { ClientPrivacyPolicyEditor } from '../_components/ClientPrivacyPolicyEditor';

type PrivacyPolicyProps = {
  params: Promise<{
    id: string;
  }>;
};

export const generateMetadata = async (
  _: PrivacyPolicyProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { title } = await parent;
  return {
    title: `プライバシーポリシー | ${title?.absolute}`,
    description: 'プライバシーポリシー',
  };
};

export default async function Page(props: PrivacyPolicyProps) {
  if (!(await authGuard())) {
    return redirect('/admin/signin');
  }
  return <ClientPrivacyPolicyEditor />
}
