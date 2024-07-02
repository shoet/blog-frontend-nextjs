import { Meta, StoryObj } from "@storybook/react";
import { BlogCard } from ".";

export default {
  title: "Molecules/BlogCard",
  component: BlogCard,
} as Meta<typeof BlogCard>;

export type Story = StoryObj<typeof BlogCard>;

export const Default: Story = {
  args: {
    blog: {
      id: 1,
      title: "title",
      content: "content",
      authorId: 1,
      description: "description",
      thumbnailImageFileName: "https://placehold.jp/150x150.png",
      tags: ["tag1", "tag2"],
      isPublic: true,
      created: 1710039459,
      modified: 1710039459,
    },
  },
};
