import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";

export default {
  title: "Atoms/Button",
  component: Button,
} as Meta<typeof Button>;

export type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "PrimaryButton",
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "SecondaryButton",
    disabled: false,
  },
};
