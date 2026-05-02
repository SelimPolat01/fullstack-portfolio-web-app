"use client";

import { Key } from "lucide-react";
import Login from "@/app/components/Login/Login";
import classes from "./Login.module.css";
import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";

export default function AdminLogin() {
  const { lang, toggleLang } = useContext(LangContext);
  const texts = {
    tr: {
      h1: ["Yönetim paneline erişmek için giriş", "yapın"],
    },
    en: {
      h1: ["Sign in to access", "the administration panel."],
    },
  };

  return (
    <div className={classes.div}>
      <div className={classes.infoContainer}>
        <Key stroke="url(#gold-stroke)" size={85} />
        <h1 className={classes.info}>
          {texts[lang].h1[0]} <br />
          {texts[lang].h1[1]} <br />
        </h1>
      </div>
      <Login />
    </div>
  );
}
