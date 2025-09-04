import type { Meta, StoryObj } from "@storybook/react";
import { useCallback, useState } from "react";
import Toast from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    message: { control: "text" },
    type: {
      control: { type: "select" },
      options: ["success", "error", "info", "warning"],
    },
    duration: { control: { type: "number", min: 0, step: 500 } },
    closable: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const SuccessFast: Story = {
  args: {
    message: "Operation successful!",
    type: "success",
    closable: false,
    duration: 2000,
  },
};

export const SuccessLong: Story = {
  args: {
    message: "Operation successful!",
    type: "success",
    closable: false,
    duration: 5000,
  },
};

export const SuccessWithCloseBtn: Story = {
  args: {
    message: "Operation successful!",
    type: "success",
    closable: true,
    duration: 7000,
  },
};

export const ErrorFast: Story = {
  args: {
    message: "Something went wrong!",
    type: "error",
    duration: 2000,
    closable: false,
  },
};

export const ErrorLong: Story = {
  args: {
    message: "Something went wrong!",
    type: "error",
    duration: 5000,
    closable: false,
  },
};

export const ErrorWithCloseBtn: Story = {
  args: {
    message: "Something went wrong!",
    type: "error",
    duration: 7000,
    closable: true,
  },
};

export const InfoFast: Story = {
  args: {
    message: "Here is some information.",
    type: "info",
    duration: 3000,
    closable: false,
  },
};

export const InfoLong: Story = {
  args: {
    message: "Here is some information.",
    type: "info",
    duration: 5000,
    closable: false,
  },
};

export const InfoWithCloseButton: Story = {
  args: {
    message: "Here is some information.",
    type: "info",
    duration: 7000,
    closable: true,
  },
};

export const WarningFast: Story = {
  args: {
    message: "Be careful with this action!",
    type: "warning",
    duration: 3000,
    closable: false,
  },
};

export const WarningLong: Story = {
  args: {
    message: "Be careful with this action!",
    type: "warning",
    duration: 5000,
    closable: false,
  },
};

export const WarningWithCloseBtn: Story = {
  args: {
    message: "Be careful with this action!",
    type: "warning",
    duration: 7000,
    closable: true,
  },
};

export const Interactive: Story = {
  args: {
    message: "This is a toast message",
    type: "info",
    duration: 3000,
    closable: true,
  },
};
