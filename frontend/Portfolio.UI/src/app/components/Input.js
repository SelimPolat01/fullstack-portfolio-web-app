import classes from "./Input.module.css";

export default function Input({
  type,
  name,
  className,
  onFocus,
  onChange,
  onBlur,
  value,
  placeholder,
}) {
  return (
    <input
      type={type}
      name={name}
      className={`${classes.input} ${className ? className : ""}`}
      id={name}
      onFocus={onFocus}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
    />
  );
}
