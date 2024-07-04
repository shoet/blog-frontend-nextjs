import { Meta, StoryObj } from "@storybook/react";
import { TagsContainer } from ".";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { getAPIPath } from "@/services";

const server = setupServer();

export default {
  title: "Organisms/TagsContainer",
  component: TagsContainer,
  decorators: [
    (Story) => {
      server.listen();
      return <Story />;
    },
  ],
} as Meta<typeof TagsContainer>;

export type Story = StoryObj<typeof TagsContainer>;

export const Default: Story = {
  decorators: [
    (Story) => {
      server.use(
        rest.get(getAPIPath("/tags"), (req, res, ctx) => {
          return res(
            ctx.json([
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
            ]),
          );
        }),
      );
      return <Story />;
    },
    (Story) => {
      return (
        <div style={{ width: "200px", backgroundColor: "gray" }}>
          <Story />
        </div>
      );
    },
  ],
};
