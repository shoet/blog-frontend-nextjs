import type { Meta, StoryObj } from "@storybook/react";
import { TagForm } from ".";
import { useState } from "react";

export default {
  title: "Molecules/TagForm",
  component: TagForm,
} as Meta<typeof TagForm>;

export type Story = StoryObj<typeof TagForm>;

export const Default: Story = {
  args: {
    tags: ["tag1", "tag2", "tag3"],
    onSubmit: (text: string) => {
      console.log("# onSubmit");
      console.log(text);
    },
  },
  render: (args) => {
    const [tags, setTags] = useState<string[]>(args.tags);
    const onSubmit = (text: string) => {
      setTags([...tags, text]);
    };
    const onClickCloseTag = (tag: string) => {
      const newTags = tags.filter((t) => {
        return t !== tag;
      });
      setTags(newTags);
    };
    return (
      <TagForm
        tags={tags}
        onSubmit={onSubmit}
        onClickCloseTag={onClickCloseTag}
      />
    );
  },
};
