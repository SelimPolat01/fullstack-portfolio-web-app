"use client";

import { Key } from "lucide-react";
import Login from "@/app/components/Login/Login";
import classes from "./Login.module.css";
import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";
import { motion } from "framer-motion";
import {
  formElementVariants,
  textContainerVariants,
  textVariants,
} from "@/lib/variants";

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
      <motion.div
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
        className={classes.infoContainer}
      >
        <motion.div variants={textVariants}>
          <Key stroke="url(#gold-stroke)" size={85} />
        </motion.div>
        <motion.h1 variants={textVariants} className={classes.info}>
          {texts[lang].h1[0]} <br />
          {texts[lang].h1[1]} <br />
        </motion.h1>
      </motion.div>
      <Login />
    </div>
  );
}
