import { Meta, StoryObj } from "@storybook/react";
import { ClientMarkdownView } from ".";

export default {
  title: "Molecules/ClientMarkdownView",
  component: ClientMarkdownView,
} as Meta<typeof ClientMarkdownView>;

export type Story = StoryObj<typeof ClientMarkdownView>;

export const Default: Story = {
  args: {
    text: `# h1
- ul
  - li1
  - li2
  - li3
### h3
sub title
`,
  },
};
