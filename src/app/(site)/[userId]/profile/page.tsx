import { UserProfile } from "@/app/_components/Molecules/UserProfile";
import { getUsersMe } from "@/services/getUsersMe";
import { getUserProfile } from "@/services/userProfile";
import type { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";

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
  const isShowEditButton = await isShowEdit(userId);
  return (
    <div>
      <UserProfile
        userProfile={{
          userId: userProfile.userId,
          nickname: userProfile.nickname,
          avatarImageFileURL: userProfile.avatarImageFileURL,
          bio: userProfile.bio,
        }}
        showEdit={isShowEditButton}
      />
    </div>
  );
}

async function isShowEdit(userId: number) {
  const cookie = await cookies();
  const token = cookie.get("authToken");
  if (!token) return false;
  const user = await getUsersMe(token.value);
  if (userId.toString() === user.id.toString()) return true;
  return false;
}
