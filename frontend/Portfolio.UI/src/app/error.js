"use client";

import { useContext, useEffect } from "react";
import { LangContext } from "@/contexts/LangContext";
import { motion } from "framer-motion";
import { RefreshCcw, AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  const { lang } = useContext(LangContext);

  useEffect(() => {
    console.error("Uygulama Hatası:", error);
  }, [error]);

  const texts = {
    tr: {
      title: "Bir şeyler ters gitti!",
      message:
        "Beklenmedik bir hata oluştu. Lütfen tekrar denemekten çekinmeyin.",
      buttonText: "Tekrar Dene",
    },
    en: {
      title: "Something went wrong!",
      message: "An unexpected error occurred. Please feel free to try again.",
      buttonText: "Try Again",
    },
  };

  return (
    <div className="errorDiv">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="errorContainer"
      >
        <div className="errorIconWrapper">
          <AlertTriangle size={48} color="#ffffff" />
        </div>

        <div className="errorContent">
          <h2>{texts[lang].title}</h2>
          <p>{texts[lang].message}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => reset()}
          className="errorResetButton"
        >
          <RefreshCcw size={20} />
          <span>{texts[lang].buttonText}</span>
        </motion.button>
      </motion.div>
    </div>
  );
}
