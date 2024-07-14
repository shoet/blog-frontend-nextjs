import { Meta, StoryObj } from "@storybook/react";
import { Profile } from ".";

export default {
  title: "Organisms/Profile",
  component: Profile,
} as Meta<typeof Profile>;

export type Story = StoryObj<typeof Profile>;

export const Default: Story = {};
