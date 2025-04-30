import { Meta, StoryObj } from "@storybook/react";
import { CommentListPresenter } from ".";

export default {
  title: "Organisms/CommentListPresenter",
  component: CommentListPresenter,
} as Meta<typeof CommentListPresenter>;

type Story = StoryObj<typeof CommentListPresenter>;

export const Default: Story = {
  args: {
    comments: [
      {
        commentId: 1,
        blogId: 1,
        clientId: "client1",
        content: "This is a comment.",
        isEdited: false,
        isDeleted: false,
        created: Date.now(),
        modified: Date.now(),
      },
      {
        commentId: 2,
        blogId: 1,
        userId: 1,
        nickname: "User1",
        content: "This is another comment.",
        isEdited: false,
        isDeleted: false,
        created: Date.now(),
        modified: Date.now(),
      },
    ],
  },
};
