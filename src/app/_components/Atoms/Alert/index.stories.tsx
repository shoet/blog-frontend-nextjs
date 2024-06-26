import { Meta, StoryObj } from "@storybook/react";
import { Alert } from ".";

export default {
  title: "atoms/Alert",
  component: Alert,
} as Meta<typeof Alert>;

export type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    text: "fuga",
  },
};
