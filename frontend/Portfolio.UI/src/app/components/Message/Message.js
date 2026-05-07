import { Check, CheckCheck } from "lucide-react";
import classes from "./Message.module.css";
import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";
import { motion } from "framer-motion";

export default function Message({ message, ...props }) {
  const { lang, toggleLang } = useContext(LangContext);
  const formatDate = (dateString, lang) => {
    const date = new Date(dateString);
    const locale = lang === "en" ? "en-US" : "tr-TR";
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgb(15, 18, 52)",
        transition: { duration: 0.05, ease: "easeIn" },
      }}
      whileTap={{ scale: 0.97 }}
      className={classes.messageContainer}
      {...props}
    >
      <h2 className={classes.sender}>{message.sender}</h2>
      <p className={classes.text}>{message.subject}</p>
      <div className={classes.dateReadContainer}>
        <span className={classes.date}>
          {formatDate(message.createdAt, lang)}
        </span>
        <span>
          {message.isRead ? (
            <CheckCheck color="#ff007f" />
          ) : (
            <Check color="#ff007f" />
          )}
        </span>
      </div>
    </motion.div>
  );
}
