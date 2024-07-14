import { Meta, StoryObj } from "@storybook/react";
import { SideMenu } from ".";

export default {
  title: "Organisms/SideMenu",
  component: SideMenu,
} as Meta<typeof SideMenu>;

export type Story = StoryObj<typeof SideMenu>;

const ComponentA = () => {
  const style = {
    height: "50px",
    "background-color": "gray",
  };
  return <div style={style}>Component A</div>;
};

const ComponentB = () => {
  const style = {
    height: "70px",
    "background-color": "green",
  };
  return <div style={style}>Component A</div>;
};

const ComponentC = () => {
  const style = {
    height: "30px",
    "background-color": "blue",
  };
  return <div style={style}>Component A</div>;
};

export const Default: Story = {
  render: () => {
    return (
      <SideMenu>
        <ComponentA />
        <ComponentB />
        <ComponentC />
      </SideMenu>
    );
  },
};
