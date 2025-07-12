import type { Meta, StoryObj } from "@storybook/react";
import { Spacer } from ".";

export default {
  title: "Atoms/Spacer",
  component: Spacer,
} as Meta<typeof Spacer>;

export type Story = StoryObj<typeof Spacer>;

export const Column: Story = {
  render: () => {
    return (
      <div>
        <div style={{ backgroundColor: "gray" }}>text</div>
        <Spacer height={30} />
        <div style={{ backgroundColor: "gray" }}>text</div>
      </div>
    );
  },
};

export const Row: Story = {
  render: () => {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ backgroundColor: "gray" }}>text</div>
        <Spacer width={30} />
        <div style={{ backgroundColor: "gray" }}>text</div>
      </div>
    );
  },
};

export const Matrix: Story = {
  render: () => {
    return (
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ backgroundColor: "gray" }}>text</div>
          <Spacer width={30} />
          <div style={{ backgroundColor: "gray" }}>text</div>
        </div>
        <Spacer height={30} />
        <div style={{ display: "flex" }}>
          <div style={{ backgroundColor: "gray" }}>text</div>
          <Spacer width={30} />
          <div style={{ backgroundColor: "gray" }}>text</div>
        </div>
      </div>
    );
  },
};
