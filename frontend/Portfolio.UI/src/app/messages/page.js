"use client";

import classes from "./Messages.module.css";
import { useGetMessages } from "../../hooks/useGetMessages";
import Message from "../components/Message";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "@/contexts/LangContext";
import { usePatchMessageRead } from "@/hooks/usePatchMessageRead";

export default function Messages() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);
  const { data, isLoading, isError, error } = useGetMessages(token);
  const { mutate, isPatchPending, isPatchError, patchErorr } =
    usePatchMessageRead();
  const { lang, toggleLang } = useContext(LangContext);
  const texts = {
    tr: {
      h1: "Mesajlar",
      loading: "Yükleniyor...",
    },
    en: {
      h1: "Messages",
      loading: "Loading...",
    },
  };

  async function clickHandler(message) {
    const messageId = message.id;
    mutate(
      { token, messageId },
      {
        onSuccess: (data) => {
          router.push(`/messages/${message.id}`);
          console.log(data?.result?.data);
          return;
        },
        onError: (err) => {
          console.log(err?.result?.message);
        },
      },
    );
  }

  return (
    <div className={classes.div}>
      {isLoading && <p>{texts[lang].loading}</p>}
      {isError && <p>{error?.message}</p>}
      <h1 className={classes.messagesText}>{texts[lang].h1}</h1>
      <div>
        <div className={classes.flexMessage}>
          {data?.result?.map((message) => {
            return (
              <Message
                onClick={() => clickHandler(message)}
                key={message.id}
                message={message}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
