import { Meta, StoryObj } from "@storybook/react";
import { BlogTable } from ".";

export default {
  title: "admin/Organisms/BlogTable",
  component: BlogTable,
} as Meta<typeof BlogTable>;

export type Story = StoryObj<typeof BlogTable>;

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
  },
};
