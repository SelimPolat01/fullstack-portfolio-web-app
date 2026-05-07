"use client";

import Image from "next/image";
import classes from "./About.module.css";
import { LangContext } from "@/contexts/LangContext";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { textContainerVariants, textVariants } from "@/lib/variants";
import { useGetPersonalInfos } from "@/hooks/GET/useGetPersonalInfos";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
  }, [router]);

  const {
    data: getPersonalInfosData,
    isLoading: getPersonalInfosIsLoading,
    isError: getPersonalInfosIsError,
    error: getPersonalInfosError,
  } = useGetPersonalInfos(token);

  const tectNames = [
    "python",
    "js",
    "csharp",
    "sql",
    "typescript",
    "nodejs",
    "dotnet",
    "react",
    "pytorch",
    "nextjs",
    "redux",
    "html",
    "css",
    "git",
  ];
  const { lang, toggleLang } = useContext(LangContext);
  const texts = {
    tr: {
      h1: "Hakkımda",
      p: "Ben Bilgisayar Mühendisliği öğrencisi ve full-stack web geliştirmeye odaklanan bir yazılım geliştiricisiyim. .NET ve modern JavaScript framework’lerine güçlü bir şekilde önem vererek çalışıyorum. ASP.NET Core kullanarak ölçeklenebilir backend sistemleri geliştiriyor ve React ile Angular kullanarak responsive frontend uygulamaları tasarlıyorum. RESTful API’ler, kimlik doğrulama sistemleri (JWT tabanlı) ve CRUD tabanlı uygulamalar geliştirme deneyimim var ve projelerimde aktif olarak clean architecture ve modüler tasarım prensiplerini uyguluyorum. Web geliştirmeye ek olarak, Python ve PyTorch kullanarak makine öğrenmesi projeleri üzerinde çalıştım; özellikle görüntü sınıflandırma ve regresyon görevlerinde deneyim kazandım, bu da problem çözme ve analitik düşünme becerilerimi geliştirdi. Gerçek dünya projeleri geliştirerek ve backend mimarisi, sistem tasarımı ve web uygulamalarında yapay zekâ entegrasyonu üzerine çalışarak becerilerimi sürekli geliştiriyorum.",
    },
    en: {
      h1: "About Me",
      p: "I am a Computer Engineering student and a software developer focused on full-stack web development with a strong emphasis on .NET and modern JavaScript frameworks. I build scalable backend systems using ASP.NET Core and design responsive frontend applications with React and Angular. I have experience developing RESTful APIs, authentication systems (JWT-based), and CRUD-based applications, and I actively apply clean architecture and modular design principles in my projects. In addition to web development, I have worked on machine learning projects using Python and PyTorch, particularly in image classification and regression tasks, which strengthened my problem-solving and analytical thinking skills. I am continuously improving my skills by building real-world projects and exploring backend architecture, system design, and AI integration in web applications.",
    },
  };

  return (
    <motion.div
      variants={textContainerVariants}
      initial="hidden"
      animate="visible"
      className={classes.div}
    >
      <motion.h1 variants={textVariants} className={classes.aboutMe}>
        {texts[lang].h1}
      </motion.h1>
      <motion.div className={classes.aboutText}>
        <motion.p variants={textVariants}>
          {getPersonalInfosData?.result?.about}
        </motion.p>
      </motion.div>
      <div className={classes.logoDiv}>
        {tectNames.map((logoPath) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            key={logoPath}
          >
            <Image
              priority
              src={`/${logoPath}.svg`}
              alt={logoPath}
              width={30}
              height={30}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
