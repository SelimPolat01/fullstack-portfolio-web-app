"use client";

import { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, AlertCircle } from "lucide-react";
import { LangContext } from "@/contexts/LangContext";

export default function NotFound() {
  const { lang } = useContext(LangContext);

  const texts = {
    tr: {
      title: "404",
      message: "Hay aksi! Aradığınız sayfa duman olmuş.",
      button: "Ana Sayfaya Dön",
      alt: "sayfa bulunamadı",
    },
    en: {
      title: "404",
      message: "Oops! The page you're looking for has vanished.",
      button: "Back to Home",
      alt: "page not found",
    },
  };

  return (
    <div className="notFoundDiv">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="notFoundContainer"
      >
        <div className="glassCard">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="notFoundTitle"
          >
            {texts[lang].title}
          </motion.h1>

          <div className="textWrapper">
            <AlertCircle size={28} className="alertIcon" />
            <p className="notFoundText">{texts[lang].message}</p>
          </div>

          <motion.img
            src="/not-found.svg"
            alt={texts[lang].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="notFoundImage"
          />

          <Link href="/" className="backHomeButton">
            <Home size={20} />
            <span>{texts[lang].button}</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
