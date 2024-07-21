import { Meta, StoryObj } from "@storybook/react";
import { MarkdownRenderer } from ".";

export default {
  title: "Molecules/MarkdownRenderer",
  component: MarkdownRenderer,
} as Meta<typeof MarkdownRenderer>;

export type Story = StoryObj<typeof MarkdownRenderer>;

export const Default: Story = {
  args: {
    markdown: `
# Sample Markdown
Here is a code block:

\`\`\`javascript
console.log("Hello, world!");
\`\`\`
`,
  },
};
