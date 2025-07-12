import type { Meta, StoryObj } from "@storybook/react";
import { Navigation } from ".";
import type { CSSProperties } from "react";

export default {
  title: "Molecules/Navigation",
  component: Navigation,
} as Meta<typeof Navigation>;

export type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  render: (args) => {
    const containerStyle = {
      width: "200px",
    } as CSSProperties;
    return (
      <div style={containerStyle}>
        <Navigation {...args} />
      </div>
    );
  },
  args: {
    items: [
      { href: "/blog", title: "Blog" },
      { href: "/portfolio", title: "Portfolio" },
      { href: "/about", title: "About" },
    ],
  },
};
