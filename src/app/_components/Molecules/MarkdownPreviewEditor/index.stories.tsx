import { Meta, StoryObj } from "@storybook/react";
import { MarkdownPreviewTextArea } from ".";

export default {
  title: "Molecules/MarkdownPreviewEditor",
  component: MarkdownPreviewTextArea,
} as Meta<typeof MarkdownPreviewTextArea>;

export type Story = StoryObj<typeof MarkdownPreviewTextArea>;

export const Default: Story = {};
