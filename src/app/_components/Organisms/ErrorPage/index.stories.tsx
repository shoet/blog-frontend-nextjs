import type { Meta, StoryObj } from "@storybook/react";
import { ErrorPage } from ".";

export default {
  title: "organisms/ErrorPage",
  component: ErrorPage,
} as Meta<typeof ErrorPage>;

type Story = StoryObj<typeof ErrorPage>;

export const NOT_FOUND: Story = {
  args: {
    statusCode: 404,
    title: "お探しのページが見つかりませんでした",
    detail:
      "あなたのご覧になっていたページからのリンクが無効になっているか、入力されたアドレス(URL)のタイプミスかもしれません。",
  },
};
