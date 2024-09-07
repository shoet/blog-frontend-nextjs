import { Meta, StoryObj } from "@storybook/react";
import { ConfirmDialog } from ".";

export default {
  title: "Molecules/ConfirmDialog",
  component: ConfirmDialog,
} as Meta<typeof ConfirmDialog>;

export type Story = StoryObj<typeof ConfirmDialog>;

export const OKOnly: Story = {
  args: {
    title: "ダイアログ",
    message: "OKしますか？",
    onClickOK: () => {
      console.log("OK");
    },
  },
};

export const OKCancel: Story = {
  args: {
    title: "ダイアログ",
    message: "OKしますか？Cancelしますか？",
    onClickOK: () => {
      console.log("OK");
    },
    onClickCancel: () => {
      console.log("Cancel");
    },
  },
};
