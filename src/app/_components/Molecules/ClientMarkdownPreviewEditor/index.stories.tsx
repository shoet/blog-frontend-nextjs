import { Meta, StoryObj } from "@storybook/react";
import { MarkdownPreviewTextArea } from ".";

export default {
  title: "Molecules/ClientMarkdownPreviewEditor",
  component: ClientMarkdownPreviewTextArea,
} as Meta<typeof ClientMarkdownPreviewTextArea>;

export type Story = StoryObj<typeof ClientMarkdownPreviewTextArea>;

export const Default: Story = {};
