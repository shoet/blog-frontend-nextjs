import type { Meta, StoryObj } from "@storybook/react";
import { CommentFormPresenter } from ".";
import { useRef } from "react";

export default {
  title: "Organisms/CommentForm",
  component: CommentFormPresenter,
} as Meta<typeof CommentFormPresenter>;

export type Story = StoryObj<typeof CommentFormPresenter>;

export const Default: Story = {
  args: {
    commentList: [
      {
        blogId: 1,
        commentId: 1,
        content: "comment1",
        created: 1,
        isDeleted: false,
        isEdited: false,
        modified: 1,
      },
    ],
  },
  render: (args) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    return <CommentFormPresenter {...args} textareaRef={textareaRef} />;
  },
};
