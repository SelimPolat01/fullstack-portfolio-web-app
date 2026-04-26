import classes from "./Button.module.css";

export default function Button({
  type,
  text,
  cancelButton,
  onClick,
  disabled,
}) {
  return (
    <button
      type={type}
      className={`${cancelButton ? classes.cancelButton : classes.button}`}
      onClick={onClick}
      disabled={disabled ? true : false}
    >
      {text}
    </button>
  );
}
