"use client";

import { useGetMessage } from "@/hooks/GET/useGetMessage";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import classes from "./Message.module.css";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { LangContext } from "@/contexts/LangContext";

export default function Message() {
  const router = useRouter();
  const params = useParams();
  const messageId = params.id;
  const [token, setToken] = useState(null);
  const { data, isLoading, isError, error } = useGetMessage(token, messageId);
  const { lang, toggleLang } = useContext(LangContext);

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (!currentToken) {
      router.replace("/login");
      return;
    }
  }, [router]);

  const texts = {
    tr: {
      loading: "Yükleniyor...",
    },
    en: {
      loading: "Loading...",
    },
  };

  if (isLoading || !data?.result) {
    return (
      <div className="loadingContainer">
        <p>{texts[lang].loading}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="loadingContainer">
        <p>{error?.message || "An error occured"}</p>
      </div>
    );
  }

  const date = new Date(data?.result?.createdAt);
  const { sender, email, phoneNumber, subject, text } = data?.result;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
      }}
      className={classes.flexMessage}
    >
      <div className={classes.messageContainer}>
        <div className={classes.infoGrid}>
          <div className={classes.infoRow}>
            <strong>Full Name:</strong>
            <span>{sender}</span>
          </div>
          <div className={classes.infoRow}>
            <strong>Email:</strong>
            <span>{email}</span>
          </div>
          <div className={classes.infoRow}>
            <strong>Phone:</strong>
            <span>{phoneNumber}</span>
          </div>
          <div className={classes.infoRow}>
            <strong>Subject:</strong>
            <span>{subject}</span>
          </div>
        </div>
        <div className={classes.messageBlock}>
          <strong>Message:</strong>
          <p className={classes.text}>{text}</p>
        </div>
        <div className={classes.dateContainer}>
          <Clock size={16} className={classes.clockIcon} />
          <span>{date.toLocaleString("tr-TR")}</span>
        </div>
      </div>
    </motion.div>
  );
}
