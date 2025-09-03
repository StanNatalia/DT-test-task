import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import type { MenuItem } from "./SidebarMenu";
import { AiOutlineMenu } from "react-icons/ai";

const meta: Meta<typeof SidebarMenu> = {
  title: "Navigation/SidebarMenu",
  component: SidebarMenu,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

const menuItems: MenuItem[] = [
  {
    label: "Home",
    children: [
      {
        label: "About",
        children: [{ label: "Our History" }, { label: "Contacts" }],
      },
      { label: "News" },
    ],
  },
  {
    label: "Profile",
    children: [{ label: "My Account" }, { label: "Settings" }],
  },
  { label: "Admin" },
];

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          style={{
            color: "var(--main-black)",
            position: "fixed",
            zIndex: 100,
            top: "25px",
            right: "25px",
            fontSize: "28px",
          }}
        >
          <AiOutlineMenu />
        </button>
        <SidebarMenu
          items={menuItems}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </>
    );
  },
};
