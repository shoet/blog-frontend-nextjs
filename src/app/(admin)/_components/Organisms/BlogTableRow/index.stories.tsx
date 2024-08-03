import { Meta, StoryObj } from "@storybook/react";
import { BlogTableRow } from ".";

export default {
  title: "admin/Organisms/BlogTableRow",
  component: BlogTableRow,
} as Meta<typeof BlogTableRow>;

export type Story = StoryObj<typeof BlogTableRow>;

export const Default: Story = {
  args: {
    blog: {
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
  },
};
