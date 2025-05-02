import { Meta, StoryObj } from "@storybook/react";
import { TextToggle } from ".";

export default {
  title: "Atoms/TextToggle",
  component: TextToggle,
} as Meta<typeof TextToggle>;

export type Story = StoryObj<typeof TextToggle>;

const Left = () => {
  return <div>Left</div>;
};

const Right = () => {
  return <div>Right</div>;
};

export const Default: Story = {
  args: {
    leftText: "left",
    rightText: "right",
    defaultStatus: "left",
  },
  render: (args) => {
    return (
      <div style={{ width: "200px" }}>
        <TextToggle {...args} />
      </div>
    );
  },
};
