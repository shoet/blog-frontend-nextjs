import { Meta, StoryObj } from "@storybook/react";
import { Dropzone } from ".";
import { useState } from "react";

export default {
  title: "Atoms/Dropzone",
  component: Dropzone,
} as Meta<typeof Dropzone>;

export type Story = StoryObj<typeof Dropzone>;

export const Default: Story = {
  render: (args) => {
    const [file, setFile] = useState<File>();
    const handleOnChange = (file?: File) => {
      if (file) {
        setFile(file);
      }
    };
    return (
      <div>
        {file && <div>File: {file.name}</div>}
        <Dropzone onChange={handleOnChange} {...args} />
      </div>
    );
  },
};
