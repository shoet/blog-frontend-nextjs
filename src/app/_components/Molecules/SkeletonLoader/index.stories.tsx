import { Meta, StoryObj } from "@storybook/react";
import { SkeletonLoader } from ".";

export default {
  title: "Molecules/SkeletonLoader",
  component: SkeletonLoader,
} as Meta<typeof SkeletonLoader>;

export type Story = StoryObj<typeof SkeletonLoader>;

export const Default: Story = {};
