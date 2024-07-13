import { Meta, StoryObj } from "@storybook/react";
import { Divider } from ".";

export default {
  title: "Atoms/Divider",
  component: Divider,
} as Meta<typeof Divider>;

export type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>AAA</div>
        <Divider height={1} />
        <div>BBB</div>
        <Divider height={1} />
        <div>CCC</div>
        <Divider height={1} />
        <div>DDD</div>
      </div>
    );
  },
};
export const Vertical: Story = {
  render: (args) => {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>AAA</div>
        <Divider width={2} />
        <div>BBB</div>
        <Divider width={2} />
        <div>CCC</div>
        <Divider width={2} />
        <div>DDD</div>
      </div>
    );
  },
};
