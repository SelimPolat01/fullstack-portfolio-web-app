import { Children } from "react";
import classes from "./Button.module.css";

export default function Button({
  type,
  cancelButton,
  onClick,
  disabled,
  className,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${cancelButton ? classes.cancelButton : classes.button} ${className ? className : ""}`}
      onClick={onClick}
      disabled={disabled ? true : false}
      {...props}
    >
      {children}
    </button>
  );
}
