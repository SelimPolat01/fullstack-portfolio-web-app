import { Check, CheckCheck } from "lucide-react";
import classes from "./Message.module.css";

export default function Message({ message, ...props }) {
  const date = new Date(message.createdAt);
  return (
    <div className={classes.messageContainer} {...props}>
      <h2 className={classes.sender}>{message.sender}</h2>
      <p className={classes.text}>{message.text}</p>
      <div className={classes.dateReadContainer}>
        <span className={classes.date}>{date.toLocaleString("tr-TR")}</span>
        <span>
          {message.isRead ? (
            <CheckCheck stroke="url(#gold-stroke)" />
          ) : (
            <Check stroke="url(#unread-gradient)" />
          )}
        </span>
      </div>
    </div>
  );
}
