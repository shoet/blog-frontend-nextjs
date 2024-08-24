import { Meta, StoryObj } from "@storybook/react";
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
    pageNumbers: ["1", "2", "3", "...", "10"],
    currentPage: "1",
  },
};
