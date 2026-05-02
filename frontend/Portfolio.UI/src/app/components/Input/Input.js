import classes from "./Input.module.css";

export default function Input({ type, name, className, ...props }) {
  return (
    <input
      type={type}
      name={name}
      className={`${classes.input} ${className ? className : ""}`}
      id={name}
      {...props}
    />
  );
}
