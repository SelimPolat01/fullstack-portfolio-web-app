import { Check, CheckCheck } from "lucide-react";
import classes from "./Message.module.css";
import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";

export default function Message({ message, ...props }) {
  const { lang, toggleLang } = useContext(LangContext);
  const formatDate = (dateString, lang) => {
    const date = new Date(dateString);
    const locale = lang === "en" ? "en-US" : "tr-TR";
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  return (
    <div className={classes.messageContainer} {...props}>
      <h2 className={classes.sender}>{message.sender}</h2>
      <p className={classes.text}>{message.text}</p>
      <div className={classes.dateReadContainer}>
        <span className={classes.date}>
          {formatDate(message.createdAt, lang)}
        </span>
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
