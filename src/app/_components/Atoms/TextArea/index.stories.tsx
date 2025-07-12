import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from ".";

export default {
  title: "Atoms/TextArea",
  component: TextArea,
} as Meta<typeof TextArea>;

export type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};
