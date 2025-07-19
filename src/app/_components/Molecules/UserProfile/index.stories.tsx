import type { Meta, StoryObj } from "@storybook/react";
import { UserProfile } from ".";

export default {
  title: "Molecules/UserProfile",
  component: UserProfile,
} as Meta<typeof UserProfile>;

type Story = StoryObj<typeof UserProfile>;

export const Default: Story = {
  args: {
    userProfile: {
      userId: 1,
      nickname: "shoet",
      bio: "description description description",
    },
    showEdit: true,
  },
};
