import type { ChangeEvent, FC, ReactNode } from "react"
import styles from "@styles/inputs.module.css"

type InputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  name: string
  children?: ReactNode | string
  type?: string
  placeholder?: string
  required?: boolean
}

function Input({ onChange, children, name, placeholder, type = "text", required }: InputProps) {
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
  )
}

export default Input
