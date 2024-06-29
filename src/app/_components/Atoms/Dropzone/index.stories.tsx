import { Meta, StoryObj } from "@storybook/react";
import { Dropzone } from ".";

export default {
  title: "Atoms/Dropzone",
  component: Dropzone,
} as Meta<typeof Dropzone>;

export type Story = StoryObj<typeof Dropzone>;

export const Default: Story = {};
