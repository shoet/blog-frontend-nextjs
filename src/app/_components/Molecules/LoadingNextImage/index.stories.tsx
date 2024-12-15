import { StoryObj } from "@storybook/react";
import { LoadingNextImage } from ".";

export default {
  title: "Molecules/LoadingNextImage",
  component: LoadingNextImage,
};

export type Story = StoryObj<typeof LoadingNextImage>;

export const Default: Story = {
  args: {
    src: "https://placehold.jp/150x150.png",
    alt: "placeholder",
    fill: true,
  },
};
