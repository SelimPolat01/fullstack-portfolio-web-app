"use client";

import { createContext, useState } from "react";

export const LangContext = createContext({
  lang: "en",
  toggleLang: () => {},
});

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const toggleLang = () => setLang((prev) => (prev === "en" ? "tr" : "en"));
  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}
