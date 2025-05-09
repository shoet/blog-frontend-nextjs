import { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToastContext } from ".";

const ToastController = () => {
  const { queueToast } = useToastContext();
  return (
    <div>
      <div>
        <button
          onClick={() => {
            const ts = Date.now();
            queueToast("title", ts.toString());
          }}
        >
          show toast
        </button>
      </div>
    </div>
  );
};

export default {
  title: "Molecules/ToastProvider",
  component: ToastProvider,
} as Meta<typeof ToastProvider>;

type Story = StoryObj<typeof ToastProvider>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <ToastProvider {...args}>
          <div>
            ブログ編集画面
            <ToastController />
          </div>
        </ToastProvider>
      </div>
    );
  },
};
