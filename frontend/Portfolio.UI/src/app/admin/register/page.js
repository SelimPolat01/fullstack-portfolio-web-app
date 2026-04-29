"use client";

import { Lock } from "lucide-react";
import Register from "../../components/Register";
import classes from "./Register.module.css";
import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";

export default function AdminRegister() {
  const { lang, toggleLang } = useContext(LangContext);
  const texts = {
    tr: {
      h1: ["Bu alan yalnızca", "yetkili kullanıcılar", "içindir."],
    },
    en: {
      h1: ["This area is for", "authorized users", "only."],
    },
  };

  return (
    <div className={classes.div}>
      <div className={classes.infoContainer}>
        <Lock stroke="url(#gold-stroke)" size={85} />
        <h1 className={classes.info}>
          {texts[lang].h1[0]} <br />
          {texts[lang].h1[1]} <br />
          {texts[lang].h1[2]}
        </h1>
      </div>
      <Register />
    </div>
  );
}
