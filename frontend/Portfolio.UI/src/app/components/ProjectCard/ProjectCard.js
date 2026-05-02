import Image from "next/image";
import classes from "./ProjectCard.module.css";
import { Layers, Paperclip, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "@/contexts/LangContext";
import Button from "../Button/Button";
import { useDeleteProject } from "@/hooks/DELETE/useDeleteProject";

export default function ProjectCard({ project, onClick, src, className }) {
  const { lang, toggleLang } = useContext(LangContext);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
      setToken(currentToken);
    }
  }, []);
  const { mutate, isPending, isError, error } = useDeleteProject();

  const formatDate = (dateString, lang) => {
    const date = new Date(dateString);
    const locale = lang === "en" ? "en-US" : "tr-TR";
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const texts = {
    tr: {
      categories: [
        "Tam Yığın",
        "Arka Uç",
        "Ön Uç",
        "Derin Öğrenme",
        "Makine Öğrenmesi",
        "Mobil",
        "Siber Güvenlik",
      ],
    },
    en: {
      categories: [
        "Full Stack",
        "Backend",
        "Frontend",
        "Deep Learning",
        "Machine Learning",
        "Mobile",
        "Cyber Security",
      ],
    },
  };

  function deleteProjectHandler(event) {
    event.stopPropagation();
    const projectId = project.id;
    mutate(
      { token, projectId },
      { onSuccess: (data) => console.log(data.message) },
    );
  }

  const categoryIndexes = {
    "Full Stack": 0,
    Backend: 1,
    Frontend: 2,
    "Deep Learning": 3,
    "Machine Learning": 4,
    Mobile: 5,
    "Cyber Security": 6,
  };

  const categoryIndex = categoryIndexes[project.category];

  const activeGradient = className || classes.existing;

  return (
    <div className={classes.projectCartContainer} onClick={onClick}>
      <div className={`${classes.projectCart} ${activeGradient}`}>
        <div className={classes.imgAndInfoContainer}>
          <div className={classes.imgContainer}>
            <Image
              width={70}
              height={70}
              src={src}
              alt={project.name}
              unoptimized
            />
          </div>
          <div className={classes.infoContainer}>
            <div className={classes.creatorAndIconContainer}>
              <p>{project.creator}</p>
              {token && (
                <Button
                  onClick={deleteProjectHandler}
                  cancelButton
                  disabled={isPending}
                >
                  <X
                    className={classes.deleteButton}
                    size={20}
                    style={{ color: "#f8f8f8", cursor: "pointer" }}
                  />
                </Button>
              )}
            </div>
            <h2>{project.name}</h2>
          </div>
        </div>
        <div className={classes.subInfoContainer}>
          <div className={classes.categoryContainer}>
            <Layers width={20} height={20} style={{ color: "#f8f8f8" }} />
            <h3>{texts[lang].categories[categoryIndex]}</h3>
          </div>
          <div className={classes.createdAtContainer}>
            <span>{formatDate(project.date, lang)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
