import type { Meta, StoryObj } from "@storybook/react";
import { Pagenator } from ".";

export default {
  title: "Molecules/Pagenator",
  component: Pagenator,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof Pagenator>;

export type Story = StoryObj<typeof Pagenator>;

export const Default: Story = {
  args: {
    totalItems: 100,
    currentPage: 9,
    itemsPerPage: 10,
  },
};
