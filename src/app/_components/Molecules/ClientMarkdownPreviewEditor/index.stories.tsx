import type { Meta, StoryObj } from "@storybook/react";
import { ClientMarkdownPreviewTextArea } from ".";
import { useState } from "react";

export default {
  title: "Molecules/ClientMarkdownPreviewTextArea",
  component: ClientMarkdownPreviewTextArea,
} as Meta<typeof ClientMarkdownPreviewTextArea>;

export type Story = StoryObj<typeof ClientMarkdownPreviewTextArea>;

export const Default: Story = {
  args: {},
  render: (args) => {
    const [markdown, setMarkdown] = useState("");

    const handleOnDragDrop = (file: File) => {
      const fileName = file.name;
      setMarkdown(`${markdown}\n${fileName}`);
    };

    const handleChangeText = (text: string) => {
      setMarkdown(text);
    };

    return (
      <ClientMarkdownPreviewTextArea
        {...args}
        value={markdown}
        onChangeText={handleChangeText}
        onDragDrop={handleOnDragDrop}
      />
    );
  },
};
