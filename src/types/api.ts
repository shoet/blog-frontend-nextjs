export type ApiContext = {
  apiBaseUrl: string;
};

export type Tag = {
  id: number;
  name: string;
};

export type Blog = {
  id: number;
  title: string;
  description: string;
  content: string;
  authorId: number;
  thumbnailImageFileName: string;
  isPublic: boolean;
  tags?: string[];
  created: number;
  modified: number;
};

export type User = {
  id: number;
  name: string;
  profile?: UserProfile;
};

export type GitHubContributions = {
  contributionDays: [
    {
      date: string;
      color: string;
      contributionCount: number;
    },
  ];
};

export type UserProfile = {
  userId: number;
  nickname: string;
  bio?: string;
  avatarImageFileURL?: string;
};

export type Comment = {
  commentId: number;
  blogId: number;
  clientId?: string;
  userId?: number;
  avatarImageFileUrl?: string;
  nickname?: string;
  content: string;
  isEdited: boolean;
  isDeleted: boolean;
  threadId?: string;
  created: number;
  modified: number;
};

export type PrivacyPolicy = {
  id: string;
  content: string;
  created: number;
  modified: number;
};
