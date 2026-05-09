"use client";

import Image from "next/image";
import classes from "./Home.module.css";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "@/contexts/LangContext";
import { motion } from "framer-motion";
import { textContainerVariants, textVariants } from "@/lib/variants";
import { useRouter } from "next/navigation";
import { useGetPersonalInfos } from "@/hooks/GET/useGetPersonalInfos";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (!currentToken) {
      router.replace("/admin/login");
      return;
    }
  }, [router]);

  const {
    data: getPersonalInfosData,
    isLoading: getPersonalInfosIsLoading,
    isError: getPersonalInfosIsError,
    error: getPersonalInfosError,
  } = useGetPersonalInfos(token);
  const { lang, toggleLang } = useContext(LangContext);
  const texts = {
    tr: {
      h1: "Merhaba, Ben Selim",
      h2: "Tam Yığın ve Makine Öğrenimi Geliştiricisi",
      p: "Ben, Next.js, React ve .NET teknolojileri ile modern web uygulamaları geliştirmeye odaklanan bir yazılım geliştiricisiyim. Ayrıca Python, PyTorch, CNN ve Vision Transformer (ViT) kullanarak makine öğrenmesi ve derin öğrenme alanlarında da deneyim sahibiyim. Hem frontend/backend sistemleri hem de yapay zekâ tabanlı projeler üzerinde çalışmayı, bunları mümkün olduğunda birleştirmeyi seviyorum. Full-stack geliştirme ve derin öğrenme alanlarında becerilerimi sürekli geliştiriyor ve yeni teknolojileri araştırıyorum. Şu anda portföyümü güçlendirmek ve hem yazılım mühendisliği hem de yapay zekâ konularında bilgi birikimimi derinleştirmek için projeler geliştiriyorum. Hedefim, etkili ve gerçek dünya problemlerine çözüm üreten güçlü bir full-stack ve yapay zekâ geliştiricisi olmaktır.",
    },
    en: {
      h1: "Hi, I'm Selim",
      h2: "Full Stack & ML Developer",
      p: "I’m a software developer focused on building modern web applications with Next.js, React, and .NET technologies. I also have experience in machine learning and deep learning using Python, PyTorch, CNNs, and Vision Transformers (ViT). I enjoy working on both frontend/backend systems and AI-based projects, combining them when possible. I’m continuously improving my skills in full-stack development and deep learning, and exploring new technologies. Currently, I’m building projects to strengthen my portfolio and deepen my knowledge in both software engineering and AI. My goal is to become a strong full-stack and AI developer, working on impactful and real-world solutions.",
    },
  };

  return (
    <motion.div
      variants={textContainerVariants}
      initial="hidden"
      animate="visible"
      className={classes.div}
    >
      <div className={classes.textWrapper}>
        <motion.h1 variants={textVariants}>
          Hi, I'm {getPersonalInfosData?.result?.name}
        </motion.h1>
        <motion.h2 variants={textVariants}>
          {getPersonalInfosData?.result?.title}
        </motion.h2>
        <motion.p variants={textVariants}>{texts[lang].p}</motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={classes.imgWrapper}
      >
        <Image
          className={classes.img}
          src="/pp.png"
          alt="profile"
          fill
          sizes="250px"
          priority
        />
      </motion.div>
    </motion.div>
  );
}
