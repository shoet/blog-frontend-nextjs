import type { Meta, StoryObj } from "@storybook/react";
import { UserProfileFormPresenter } from ".";

export default {
  title: "Molecules/UserProfileForm/Presenter",
  component: UserProfileFormPresenter,
} as Meta<typeof UserProfileFormPresenter>;

type Story = StoryObj<typeof UserProfileFormPresenter>;

export const Default: Story = {};
