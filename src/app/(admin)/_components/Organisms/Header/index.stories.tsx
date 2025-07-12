import type { Meta, StoryObj } from "@storybook/react";
import { Header } from ".";

export default {
  title: "admin/Organisms/Header",
  component: Header,
} as Meta<typeof Header>;

export type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    user: { name: "test@example.com", id: 1 },
  },
};
