"use client";

import Image from "next/image";
import classes from "./About.module.css";
import { LangContext } from "@/contexts/LangContext";
import { useContext } from "react";

export default function About() {
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
    <div className={classes.div}>
      <h1 className={classes.aboutMe}>{texts[lang].h1}</h1>
      <div className={classes.aboutText}>
        <p>{texts[lang].p}</p>
      </div>
      <div className={classes.logoDiv}>
        {tectNames.map((logoPath) => (
          <div key={logoPath}>
            <Image
              src={`/${logoPath}.svg`}
              alt={logoPath}
              width={30}
              height={30}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
