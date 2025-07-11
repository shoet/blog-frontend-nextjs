import type { Meta, StoryObj } from "@storybook/react";
import { AvatarImage } from ".";

export default {
  title: "Molecules/AvatarImage",
  component: AvatarImage,
} as Meta<typeof AvatarImage>;

type Story = StoryObj<typeof AvatarImage>;

export const Default: Story = {
  args: {
    imageURL: "https://placehold.co/600x400?text=Hello+World",
  },
  render: (args) => {
    return (
      <div style={{ height: "100px", width: "200px", backgroundColor: "gray" }}>
        <AvatarImage {...args} />
      </div>
    );
  },
};
