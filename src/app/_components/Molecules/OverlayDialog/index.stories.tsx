import { Meta, StoryObj } from "@storybook/react";
import { OverlayDialog } from ".";

export default {
  title: "Molecules/OverlayDialog",
  component: OverlayDialog,
} as Meta<typeof OverlayDialog>;

export type Story = StoryObj<typeof OverlayDialog>;

export const Default: Story = {
  args: {
    title: "ダイアログ",
    message: "OKしますか？",
    onClickOK: () => {
      console.log("OK");
    },
    onClickCancel: () => {
      console.log("Cancel");
    },
  },
};
