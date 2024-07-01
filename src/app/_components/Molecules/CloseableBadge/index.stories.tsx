import { Meta, StoryObj } from "@storybook/react";
import { CloseableBadge } from ".";

export default {
  title: "Molecules/CloseableBadge",
  component: CloseableBadge,
} as Meta<typeof CloseableBadge>;

export type Story = StoryObj<typeof CloseableBadge>;

export const Default: Story = {
  args: {
    color: "white",
    backgroundColor: "black",
  },

  render: (args) => {
    const onClickClose = () => console.log("# click close");
    return (
      <CloseableBadge onClickClose={onClickClose} {...args}>
        CloseableBadge
      </CloseableBadge>
    );
  },
};
