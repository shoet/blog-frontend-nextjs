import { Meta, StoryObj } from "@storybook/react";
import { Toast } from ".";

export default {
  title: "Molecules/Toast",
  component: Toast,
} as Meta<typeof Toast>;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    title: "タイトル",
    detail: "詳細詳細詳細",
  },
};

export const WithClose: Story = {
  args: {
    title: "タイトル",
    detail: "詳細詳細詳細",
    onClickClose: () => {
      console.log("close");
    },
  },
};
