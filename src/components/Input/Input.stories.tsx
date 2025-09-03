import type { Meta, StoryObj } from "@storybook/react";
import Input from "./Input";
import { Controller, useForm } from "react-hook-form";
import { background } from "storybook/internal/theming";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const meta: Meta<typeof Input> = {
  title: "Input/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: {
    placeholder: "Enter text...",
    type: "text",
  },
};

export const TextWithClearable: Story = {
  args: {
    placeholder: "Enter text...",
    type: "text",
    clearable: true,
    clearableOffset: 10,
  },
};

export const Password: Story = {
  args: {
    placeholder: "Enter password...",
    type: "password",
  },
};

export const PasswordWithClearable: Story = {
  args: {
    placeholder: "Enter password...",
    type: "password",
    clearable: true,
    clearableOffset: 35,
  },
};

export const Number: Story = {
  args: {
    placeholder: "Enter number...",
    type: "number",
  },
};

export const NumberWithClearable: Story = {
  args: {
    placeholder: "Enter number...",
    type: "number",
    clearable: true,
    clearableOffset: 10,
  },
};

const schema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Name must be at least 3 characters"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\+380\d{9}$/, "Enter a valid Ukrainian number (+380...)"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const WithValidation: Story = {
  render: () => {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        username: "",
        phone: "",
        password: "",
      },
      resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
      alert(JSON.stringify(data, null, 2));
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f0f0",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            width: "280px",
          }}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder="Enter username..."
                  type="text"
                  clearable
                  clearableOffset={10}
                />
                {errors.username && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.username.message}
                  </span>
                )}
              </>
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder="Enter phone..."
                  type="text"
                  clearable
                  clearableOffset={10}
                />
                {errors.phone && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.phone.message}
                  </span>
                )}
              </>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  placeholder="Enter password..."
                  type="password"
                  clearable
                  clearableOffset={35}
                />
                {errors.password && (
                  <span style={{ color: "red", fontSize: "12px" }}>
                    {errors.password.message}
                  </span>
                )}
              </>
            )}
          />

          <button
            type="submit"
            style={{
              backgroundColor: "var(--main-grey)",
              color: "var(--main-white)",
              padding: "10px 16px",
              borderRadius: "20px",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  },
};
