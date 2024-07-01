import { Meta, StoryObj } from "@storybook/react";
import { TagForm } from ".";
import { useState } from "react";
import { Tag } from "@/types/api";

export default {
  title: "Molecules/TagForm",
  component: TagForm,
} as Meta<typeof TagForm>;

export type Story = StoryObj<typeof TagForm>;

export const Default: Story = {
  args: {
    tags: [
      { id: 1, name: "tag1" },
      { id: 2, name: "tag2" },
      { id: 3, name: "tag3" },
    ],
    onSubmit: (text: string) => {
      console.log("# onSubmit");
      console.log(text);
    },
  },
  render: (args) => {
    const [tags, setTags] = useState<Tag[]>(args.tags);
    const onSubmit = (text: string) => {
      const now = new Date();
      const newTag: Tag = { id: now.getTime(), name: text };
      setTags([...tags, newTag]);
    };
    const onClickCloseTag = (tag: Tag) => {
      const newTags = tags.filter((t) => {
        return t.id !== tag.id;
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
