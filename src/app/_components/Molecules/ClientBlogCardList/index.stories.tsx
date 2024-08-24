import { Meta, StoryObj } from "@storybook/react";
import { ClientBlogCardList } from ".";

export default {
  title: "Molecules/ClientBlogCardList",
  component: ClientBlogCardList,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof ClientBlogCardList>;

export type Story = StoryObj<typeof ClientBlogCardList>;

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
