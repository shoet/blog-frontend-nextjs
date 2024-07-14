import { Meta, StoryObj } from "@storybook/react";
import { ClientTags } from ".";

export default {
  title: "Molecules/ClientTags",
  component: ClientTags,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta<typeof ClientTags>;

export type Story = StoryObj<typeof ClientTags>;

export const Default: Story = {
  args: {
    tags: [
      {
        id: 14,
        name: "AWS",
      },
      {
        id: 19,
        name: "ECS",
      },
      {
        id: 12,
        name: "Go",
      },
      {
        id: 20,
        name: "Lambda",
      },
      {
        id: 18,
        name: "OpenAI",
      },
      {
        id: 15,
        name: "PlanetScale",
      },
      {
        id: 13,
        name: "React",
      },
      {
        id: 17,
        name: "ServerlessFramework",
      },
      {
        id: 2,
        name: "test",
      },
      {
        id: 16,
        name: "Upstash",
      },
    ],
  },
  // decorators: [
  //   (Story) => {
  //     return (
  //       <div style={{ width: "200px", backgroundColor: "gray" }}>
  //         <Story />
  //       </div>
  //     );
  //   },
  // ],
};
