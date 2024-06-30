import { Meta, StoryObj } from "@storybook/react";
import { DragableTextarea } from ".";

export default {
  title: "Atoms/DragableTextarea",
  component: DragableTextarea,
} as Meta<typeof DragableTextarea>;

export type Story = StoryObj<typeof DragableTextarea>;

export const Default: Story = {};
