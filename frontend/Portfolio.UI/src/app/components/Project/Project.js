"use client";

import Image from "next/image";
import Link from "next/link";
import classes from "./Project.module.css";
import { useGetProject } from "@/hooks/GET/useGetProject";
import {
  X,
  CheckCircle2,
  Code,
  Calendar,
  Activity,
  SquarePen,
} from "lucide-react";
import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";
import { motion } from "framer-motion";

export default function Project({ projectId, onClose }) {
  const { lang, toggleLang } = useContext(LangContext);
  const { data, isLoading, isError, error } = useGetProject(projectId);
  const token = localStorage.getItem("token");

  const texts = {
    tr: {
      techs: "Kullanılan Teknolojiler",
      github: "GitHub'da Göster",
      date: "Tarih",
      status: "Durum",
      about: "Proje Hakkında",
      features: "Anahtar Özellikler",
    },
    en: {
      techs: "Technologies Used",
      github: "View on GitHub",
      date: "Date",
      status: "Status",
      about: "About the Project",
      features: "Key Features",
    },
  };

  if (isLoading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={classes.loading}
      >
        Loading project...
      </motion.div>
    );
  if (isError)
    return (
      <div className={classes.error}>An error occurred: {error?.message}</div>
    );

  const project = data?.result;

  const formattedDate = project?.date
    ? new Date(project.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  return (
    <div className={classes.overlay}>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{
          opacity: 0,
          x: 100,
          transition: { duration: 0.25, ease: "easeIn" },
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        layout
        className={classes.projectModal}
      >
        <div className={classes.actionButtons}>
          {token && (
            <Link
              href={`/admin/projects/edit/${projectId}`}
              className={classes.editButton}
            >
              <SquarePen size={24} />
            </Link>
          )}
          <button onClick={onClose} className={classes.closeButton}>
            <X size={24} />
          </button>
        </div>
        <div className={classes.gridContainer}>
          <div className={classes.leftColumn}>
            <div className={classes.imageWrapper}>
              {project?.imageUrl && (
                <Image
                  src={`https://localhost:7178${project.imageUrl}`}
                  alt={project.name}
                  width={800}
                  height={500}
                  className={classes.projectImage}
                  unoptimized
                />
              )}
            </div>

            <div className={classes.techSection}>
              <h4>{texts[lang].techs}</h4>
              <div className={classes.techBadges}>
                {project?.techs?.map((tech, index) => (
                  <span key={index} className={classes.badge}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project?.githubLink && (
              <Link
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.githubButton}
              >
                <Code size={20} />
                <span>{texts[lang].github}</span>
              </Link>
            )}

            <div className={classes.extraInfo}>
              <div className={classes.infoBox}>
                <Calendar size={20} className={classes.infoIcon} />
                <div className={classes.infoTexts}>
                  <span className={classes.infoTitle}>{texts[lang].date}</span>
                  <span className={classes.infoText}>{formattedDate}</span>
                </div>
              </div>

              <div className={classes.infoBox}>
                <Activity size={20} className={classes.infoIcon} />
                <div className={classes.infoTexts}>
                  <span className={classes.infoTitle}>
                    {texts[lang].status}
                  </span>
                  <span className={classes.infoText}>{project?.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.rightColumn}>
            <div className={classes.header}>
              <span className={classes.category}>{project?.category}</span>
              <h2 className={classes.title}>{project?.name}</h2>
              <p className={classes.shortDesc}>{project?.shortDesc}</p>
            </div>

            <div className={classes.divider}></div>

            <div className={classes.longDescSection}>
              <h4>{texts[lang].about}</h4>
              <p>{project?.longDesc}</p>
            </div>

            <div className={classes.featuresSection}>
              <h4>{texts[lang].features}</h4>
              <ul className={classes.featureList}>
                {project?.features?.map((feature, index) => (
                  <li key={index}>
                    <CheckCircle2 size={18} className={classes.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
