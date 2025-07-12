import type { Meta, StoryObj } from "@storybook/react";
import { BlogCardList } from ".";

export default {
  title: "Organisms/BlogCardList",
  component: BlogCardList,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof BlogCardList>;

export type Story = StoryObj<typeof BlogCardList>;

export const Default: Story = {
  args: {
    blogs: [
      {
        id: 1,
        title: "title",
        content: "content",
        authorId: 1,
        description: "description",
        thumbnailImageFileName:
          "https://d3dm4sqployh65.cloudfront.net/thumbnail/G4YWMOJQMVTDGZRRMFSDIZDGGM4GKMRZGIYDGODCGFRWGYZZMEYA.png",
        tags: ["tag1", "tag2"],
        isPublic: true,
        created: 1710039459,
        modified: 1710039459,
      },
      {
        id: 1,
        title: "title",
        content: "content",
        authorId: 1,
        description: "description",
        thumbnailImageFileName:
          "https://d3dm4sqployh65.cloudfront.net/thumbnail/G4YWMOJQMVTDGZRRMFSDIZDGGM4GKMRZGIYDGODCGFRWGYZZMEYA.png",
        tags: ["tag1", "tag2"],
        isPublic: true,
        created: 1710039459,
        modified: 1710039459,
      },
      {
        id: 1,
        title: "title",
        content: "content",
        authorId: 1,
        description: "description",
        thumbnailImageFileName:
          "https://d3dm4sqployh65.cloudfront.net/thumbnail/G4YWMOJQMVTDGZRRMFSDIZDGGM4GKMRZGIYDGODCGFRWGYZZMEYA.png",
        tags: ["tag1", "tag2"],
        isPublic: true,
        created: 1710039459,
        modified: 1710039459,
      },
    ],
    totalItems: 100,
    itemsPerPage: 5,
    currentPage: 1,
  },
};
