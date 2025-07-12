import type { Meta, StoryObj } from "@storybook/react";
import { ClientBlogEditForm } from ".";

export default {
  title: "admin/Organisms/ClientBlogEditForm",
  component: ClientBlogEditForm,
} as Meta<typeof ClientBlogEditForm>;

export type Story = StoryObj<typeof ClientBlogEditForm>;

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
