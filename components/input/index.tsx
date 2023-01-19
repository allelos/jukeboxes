import type { ChangeEvent, FC, ReactNode } from "react";
import styles from "@styles/inputs.module.css";

type Props = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  children?: ReactNode | string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

const Input: FC<Props> = ({
  onChange,
  children,
  name,
  placeholder,
  type = "text",
  required,
}) => {
  return (
    <label className={styles.label}>
      {children}
      {required && " *"}
      <input
        className={styles.input}
        autoComplete="off"
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
