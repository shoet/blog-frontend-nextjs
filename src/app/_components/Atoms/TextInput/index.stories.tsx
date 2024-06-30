import { Meta, StoryObj } from "@storybook/react";
import { TextInput } from ".";

export default {
  title: "Atoms/TextInput",
  component: TextInput,
} as Meta<typeof TextInput>;

export type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  render: (args) => {
    return <TextInput {...args} />;
  },
};

export const HasNotBorder: Story = {
  args: {
    hasBorder: false,
  },
};

export const IsError: Story = {
  render: (args) => {
    return <TextInput isError {...args} />;
  },
};
