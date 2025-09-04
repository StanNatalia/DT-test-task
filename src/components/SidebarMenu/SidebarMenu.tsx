// SidebarMenu.tsx
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import styles from "./SidebarMenu.module.css";
import { motion, AnimatePresence } from "framer-motion";

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  onClick?: () => void;
}

interface SidebarMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  items,
  isOpen,
  onClose,
}) => {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  const toggleExpand = (path: string) => {
    const newSet = new Set(expandedPaths);
    if (newSet.has(path)) {
      newSet.delete(path);
    } else {
      newSet.add(path);
    }
    setExpandedPaths(newSet);
  };

  const renderMenu = (
    menuItems: MenuItem[],
    parentPath = "",
    isRoot = false,
    depth = 0
  ): React.ReactNode => (
    <ul
      className={`${styles.menu} ${isRoot ? styles.root : styles.subMenu}`}
      data-depth={depth}
    >
      {menuItems.map((item, index) => {
        const path = parentPath ? `${parentPath}-${index}` : `${index}`;
        const isExpanded = expandedPaths.has(path);
        return (
          <li key={path}>
            <div
              className={styles.menuItem}
              onClick={() =>
                item.children ? toggleExpand(path) : item.onClick?.()
              }
            >
              {item.label}
              {item.children && (
                <span className={styles.arrow}>{isExpanded ? "▲" : "▼"}</span>
              )}
            </div>

            <AnimatePresence initial={false}>
              {item.children && isExpanded && (
                <motion.div
                  className={styles.subMenuWrapper}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {renderMenu(item.children, path, false, depth + 1)}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.show : ""}`}
      onClick={onClose}
    >
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          <IoMdClose />
        </button>
        <nav>{renderMenu(items, "", true)}</nav>
      </aside>
    </div>
  );
};

export default SidebarMenu;
