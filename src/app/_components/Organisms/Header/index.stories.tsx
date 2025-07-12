import type { Meta, StoryObj } from "@storybook/react";
import { Header } from ".";

export default {
  title: "Organisms/Header",
  component: Header,
} as Meta<typeof Header>;

export type Story = StoryObj<typeof Header>;

export const Default: Story = {};
