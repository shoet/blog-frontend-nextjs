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
    onClickOK: () => {
      console.log("OK");
    },
  },
  render: (args) => {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <ConfirmDialog {...args}>
          <div>メッセージ</div>
        </ConfirmDialog>
      </div>
    );
  },
};

export const OKCancel: Story = {
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
        <ConfirmDialog {...args}>
          <div>メッセージ</div>
        </ConfirmDialog>
      </div>
    );
  },
};
