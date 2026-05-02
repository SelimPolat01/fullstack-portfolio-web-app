import classes from "./TextArea.module.css";

export default function TextArea({ name, className, ...props }) {
  return (
    <textarea
      name={name}
      id={name}
      className={`${classes.textarea} ${className ? className : ""}`}
      {...props}
    ></textarea>
  );
}
