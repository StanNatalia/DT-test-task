import React, { useState } from "react";
import styles from "./Input.module.css";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
  clearableOffset?: number;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  clearable = false,
  clearableOffset = 0,
  value: controlledValue,
  onChange,
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setUncontrolledValue("");
    onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={styles.wrapper}>
      <input
        {...props}
        type={inputType}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />

      {type === "password" && (
        <button
          type="button"
          className={styles.iconBtn}
          onClick={togglePassword}
        >
          {showPassword ? <LuEyeOff /> : <LuEye />}
        </button>
      )}

      {clearable && value && (
        <button
          type="button"
          className={styles.iconBtn}
          onClick={handleClear}
          style={{ right: `${clearableOffset}px` }}
        >
          <IoMdClose />
        </button>
      )}
    </div>
  );
};

export default Input;
