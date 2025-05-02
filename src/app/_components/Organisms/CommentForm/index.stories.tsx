import { Meta, StoryObj } from "@storybook/react";
import { CommentForm } from ".";

export default {
  title: "Organisms/CommentForm",
  component: CommentForm,
} as Meta<typeof CommentForm>;

export type Story = StoryObj<typeof CommentForm>;

export const Default: Story = {};
