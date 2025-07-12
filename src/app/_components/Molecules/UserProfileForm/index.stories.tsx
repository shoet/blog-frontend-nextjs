import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileForm } from ".";

export default {
  title: "Molecules/UserProfileForm/Presenter",
  component: UserProfileForm,
} as Meta<typeof UserProfileForm>;

type Story = StoryObj<typeof UserProfileForm>;

export const Default: Story = {};
