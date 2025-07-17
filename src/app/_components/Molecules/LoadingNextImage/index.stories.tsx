import type { StoryObj } from "@storybook/react";
import { LoadingNextImage } from ".";

export default {
  title: "Molecules/LoadingNextImage",
  component: LoadingNextImage,
};

export type Story = StoryObj<typeof LoadingNextImage>;

export const Default: Story = {
  args: {
    src: "http://notfoundimage",
    alt: "placeholder",
    fill: true,
  },
};
