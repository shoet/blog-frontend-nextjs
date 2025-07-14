import type { Meta, StoryObj } from "@storybook/react";
import {
  IconGitHub,
  IconYoutube,
  IconTwitter,
  IconXmark,
  IconGlass,
  IconArrowRight,
  IconArrowLeft,
} from ".";

export default {
  title: "Atoms/Icon",
  component: IconGitHub,
} as Meta<typeof IconGitHub>;

export type Story = StoryObj<typeof IconGitHub>;

export const GitHub = () => <IconGitHub />;
export const Youtube = () => <IconYoutube />;
export const Twitter = () => <IconTwitter />;
export const Xmark = () => <IconXmark />;
export const Glass = () => <IconGlass />;
export const ArrowRight = () => <IconArrowRight />;
export const ArrorLeft = () => <IconArrowLeft />;
export const IconFocusColor = () => <IconGitHub focusColor="#7ccca4" />;
export const IconSize = () => <IconGitHub size="4x" />;
export const IconColor = () => <IconGitHub color="green" />;
