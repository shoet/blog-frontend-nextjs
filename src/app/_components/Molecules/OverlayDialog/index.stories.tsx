import type { Meta, StoryObj } from "@storybook/react";
import { OverlayDialog } from ".";

export default {
  title: "Molecules/OverlayDialog",
  component: OverlayDialog,
} as Meta<typeof OverlayDialog>;

export type Story = StoryObj<typeof OverlayDialog>;

export const Default: Story = {
  args: {
    title: "ダイアログ",
    onClickOK: () => {
      console.log("OK");
    },
    onClickCancel: () => {
      console.log("Cancel");
    },
  },
  render: (args) => {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <OverlayDialog {...args}>
          <div>メッセージ</div>
        </OverlayDialog>
      </div>
    );
  },
};
