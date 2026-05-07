"use client";

import classes from "./Button.module.css";
import { motion } from "framer-motion";

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
    <motion.button
      type={type}
      className={`${cancelButton ? classes.cancelButton : classes.button} ${className ? className : ""}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
