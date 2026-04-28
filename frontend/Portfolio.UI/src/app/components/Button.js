import { Children } from "react";
import classes from "./Button.module.css";

export default function Button({
  type,
  cancelButton,
  onClick,
  disabled,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${cancelButton ? classes.cancelButton : classes.button}`}
      onClick={onClick}
      disabled={disabled ? true : false}
      {...props}
    >
      {children}
    </button>
  );
}
