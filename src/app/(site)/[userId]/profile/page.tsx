import { UserProfile } from "@/app/_components/Molecules/UserProfile";
import { getUserProfile } from "@/services/userProfile";
import { Metadata, ResolvingMetadata } from "next";

type UserProfileProps = {
  params: Promise<{
    userId: number;
  }>;
};

export const generateMetadata = async (
  props: UserProfileProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { title } = await parent;
  const { userId } = await props.params;
  const userProfile = await getUserProfile(userId);
  const description = userProfile.nickname;
  return {
    title: `${userProfile.nickname} | ${title?.absolute}`,
    description: description,
  };
};

export default async function Page(props: UserProfileProps) {
  const { userId } = await props.params;
  const userProfile = await getUserProfile(userId);
  return (
    <div>
      <UserProfile
        userProfile={{
          userId: userProfile.userId,
          nickname: userProfile.nickname,
          avatarImageURL: userProfile.avatarImageFileURL,
          bio: userProfile.bio,
        }}
      />
    </div>
  );
}
