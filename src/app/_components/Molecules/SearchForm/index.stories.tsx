import { Meta, StoryObj } from "@storybook/react";
import { SearchForm } from ".";

export default {
  title: "Molecules/SearchForm",
  component: SearchForm,
} as Meta<typeof SearchForm>;

export type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {
  args: {
    onSubmit: (keyword: string) => {
      console.log("# onSubmit");
      console.log(keyword);
    },
  },
};
