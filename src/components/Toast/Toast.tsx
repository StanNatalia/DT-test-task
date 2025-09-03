import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";
import { IoMdClose } from "react-icons/io";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  closable = false,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span>{message}</span>
      {closable && (
        <button
          className={styles.closeBtn}
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
        >
          <IoMdClose />
        </button>
      )}
    </div>
  );
};

export default Toast;
