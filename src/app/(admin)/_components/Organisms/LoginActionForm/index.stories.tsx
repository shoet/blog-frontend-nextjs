import type { Meta, StoryObj } from "@storybook/react";
import { LoginActionForm } from ".";

export default {
  title: "admin/Organisms/LoginActionForm",
  component: LoginActionForm,
} as Meta<typeof LoginActionForm>;

export type Story = StoryObj<typeof LoginActionForm>;

export const Default: Story = {};
