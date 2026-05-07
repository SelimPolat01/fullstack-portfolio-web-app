"use client";

import { LangContext } from "@/contexts/LangContext";
import { useContext } from "react";

export default function Loading() {
  const { lang, toggleLang } = useContext(LangContext);
  const texts = {
    tr: {
      loading: "Yükleniyor...",
    },
    en: {
      loading: "Loading...",
    },
  };
  return (
    <div className="loadingContainer">
      <p>{texts[lang].loading}</p>
    </div>
  );
}
