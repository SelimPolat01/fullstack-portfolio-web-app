"use client";

import { Lock } from "lucide-react";
import Register from "@/app/components/Register/Register";
import classes from "./Register.module.css";
import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";
import { motion } from "framer-motion";
import {
  formElementVariants,
  textContainerVariants,
  textVariants,
} from "@/lib/variants";

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
      <motion.div
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
        className={classes.infoContainer}
      >
        <motion.div variants={textVariants}>
          <Lock stroke="url(#gold-stroke)" size={85} />
        </motion.div>
        <motion.h1 variants={textVariants} className={classes.info}>
          {texts[lang].h1[0]} <br />
          {texts[lang].h1[1]} <br />
          {texts[lang].h1[2]}
        </motion.h1>
      </motion.div>
      <Register />
    </div>
  );
}
