import React, { useState } from "react";
import styles from "./Input.module.css";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
}

const Input: React.FC<InputProps & { clearableOffset?: number }> = ({
  type = "text",
  clearable = false,
  clearableOffset = 0,
  ...props
}) => {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    props.onChange?.(e);
  };

  const handleClear = () => {
    setValue("");
    props.onChange?.({
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
