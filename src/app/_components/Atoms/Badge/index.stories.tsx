import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from ".";

export default {
  title: "Atoms/Badge",
  component: Badge,
} as Meta<typeof Badge>;

export type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: (args) => {
    return <Badge {...args}>Badge</Badge>;
  },
  args: {
    variant: "black",
    onClick: () => console.log("clicked"),
  },
};

