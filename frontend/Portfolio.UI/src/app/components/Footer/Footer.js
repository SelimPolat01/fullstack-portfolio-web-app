"use client";

import { useGetPersonalInfos } from "@/hooks/GET/useGetPersonalInfos";
import { useContext, useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import classes from "./Footer.module.css";
import { useGetSiteSettings } from "@/hooks/GET/useGetSiteSettings";
import { LangContext } from "@/contexts/LangContext";

export default function Footer({ author }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
  }, []);
  const { data } = useGetSiteSettings(token);
  const { lang } = useContext(LangContext);

  const texts = {
    tr: {
      description: ".NET ve Next.js ile geliştirildi.",
      title: "Tam Yığın ve Makine Öğrenimi Geliştiricisi",
    },
    en: {
      description: "Built with .NET and Next.js",
      title: "Full-Stack & ML Developer",
    },
  };

  return (
    <div className={classes.footer}>
      <div className={classes.container}>
        <h2 className={classes.author}>{author}</h2>
        <h3 className={classes.title}>{texts[lang].title}</h3>
        <p className={classes.description}>{texts[lang].description}</p>
        <div className={classes.socialContainer}>
          {data?.result?.data?.gitHubUrl && (
            <a
              href={data?.result?.data?.gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <FaGithub size={25} />
            </a>
          )}

          {data?.result?.data?.linkedInUrl && (
            <a
              href={data?.result?.data?.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <FaLinkedin size={25} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
