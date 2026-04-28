import classes from "./Message.module.css";

export default function Message({ message, ...props }) {
  const date = new Date(message.createdAt);
  return (
    <div className={classes.messageContainer} {...props}>
      <h2 className={classes.sender}>{message.sender}</h2>
      <p className={classes.text}>{message.text}</p>
      <p className={classes.date}>{date.toLocaleString("tr-TR")}</p>
    </div>
  );
}
