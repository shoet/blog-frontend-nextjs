import { UserProfileForm } from "@/app/_components/Molecules/UserProfileForm";
import { getUserProfile } from "@/services/userProfile";
import { Metadata, ResolvingMetadata } from "next";

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
