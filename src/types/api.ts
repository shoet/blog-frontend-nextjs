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
