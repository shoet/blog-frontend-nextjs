import { UserProfileForm } from "@/app/_components/Molecules/UserProfileForm";
import { authGuard } from "@/middleware";
import { getUserProfile } from "@/services/userProfile";
import type { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

type UserProfileEditProps = {
  params: Promise<{
    userId: number;
  }>;
  searchParams: Promise<{}>;
};

export const generateMetadata = async (
  props: UserProfileEditProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title } = await parent;
  const { userId } = await props.params;
  const { nickname } = await getUserProfile(userId);
  const description = nickname;
  return {
    title: `${nickname} | ${title?.absolute}`,
    description: description,
  };
};

const UserProfileEditPage = async (props: UserProfileEditProps) => {
  if (!(await authGuard())) {
    redirect("/blogs");
  }
  const { userId } = await props.params;
  const { nickname, bio, avatarImageFileURL } = await getUserProfile(userId);
  return (
    <div>
      <UserProfileForm
        userId={userId}
        avatarImageURL={avatarImageFileURL}
        nickname={nickname}
        bio={bio}
      />
    </div>
  );
};

export default UserProfileEditPage;
