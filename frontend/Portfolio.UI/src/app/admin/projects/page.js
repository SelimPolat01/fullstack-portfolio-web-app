"use client";

import Image from "next/image";

import classes from "./Projects.module.css";

import Link from "next/link";

import Button from "../../components/Button/Button";

import {
  Download,
  ListFilter,
  PlusCircle,
  SlidersHorizontal,
  SquarePen,
} from "lucide-react";

import ProjectCart from "../../components/ProjectCard/ProjectCard";
import Project from "../../components/Project/Project";
import { useContext, useEffect, useMemo, useState } from "react";
import { LangContext } from "@/contexts/LangContext";
import { useGetProjects } from "@/hooks/GET/useGetProjects";

export default function Home() {
  const [clickProject, setClickProject] = useState(false);
  const [projectStyles, setProjectStyles] = useState({});

  const [token, setToken] = useState(null);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
      setToken(currentToken);
    }
  }, []);
  const [profile, setProfile] = useState({
    name: "Selim POLAT",
    job: "Full Stack & ML Developer",
  });
  const [visible, setVisible] = useState({
    input: false,
    sort: false,
    filter: false,
    categoryMenu: false,
    statusMenu: false,
  });
  const [order, setOrder] = useState({
    by: "Date",
    descending: true,
  });
  const [filter, setFilter] = useState({
    category: null,
    status: null,
  });
  const [clickedProjectId, setClickedProjectId] = useState(null);
  const { lang, toggleLang } = useContext(LangContext);
  const { data, isLoading, isError, error } = useGetProjects(
    order.by,
    order.descending,
    filter.category,
    filter.status,
  );

  const texts = {
    tr: {
      p: "Tam Yığın & Makine Öğrenimi Geliştiricisi",
      options: [
        "SEÇENEKLER",
        "Yeni Proje Ekle",
        "Profili Düzenle",
        "CV'yi İndir",
      ],
      sorts: ["Sıralama", "Tarih", "İsim", "Oluşturucu", "Kategori"],
      filters: ["Kategori", "Durum"],
      status: ["Bitti", "Bitmedi"],
    },
    en: {
      p: "Full Stack & ML Developer",
      options: ["OPTIONS", "Add New Project", "Edit Profile", "Download CV"],
      sorts: ["Sort by", "Date", "Name", "Creator", "Category"],
      filters: ["Category", "Status"],
      status: ["Finished", "Not Finished"],
    },
  };

  const sortIndexes = {
    Date: 1,
    Name: 2,
    Creator: 3,
    Category: 4,
  };

  const sortIndex = sortIndexes[order.by];

  const projectCartGradientClasses = useMemo(() => {
    return [
      classes.deepOcean,
      classes.midnightPurple,
      classes.sunsetEmber,
      classes.emeraldHealth,
      classes.cyberpunkNeon,
      classes.minimalistGrey,
      classes.deepOcean,
      classes.royalBlue,
      classes.softyCandy,
      classes.blackPearl,
      classes.articFrost,
      classes.exitsing,
    ];
  }, []);

  useEffect(() => {
    if (data?.result) {
      const styles = {};
      data.result.forEach((project) => {
        const randomIndex = Math.floor(
          Math.random() * projectCartGradientClasses.length,
        );
        styles[project.id] = projectCartGradientClasses[randomIndex];
      });
      setProjectStyles(styles);
    }
  }, [data]);

  function openProjectPanel(projectId) {
    setClickProject(true);
    setClickedProjectId(projectId);
  }

  function closeProjectPanel() {
    setClickProject(false);
    setClickedProjectId(null);
  }

  function clearFilters() {
    setFilter({ category: null, status: null });
    setVisible({ sort: false, filter: false });
  }

  return (
    <div className={classes.div}>
      <div className={classes.userMenu}>
        <div className={classes.userMenuWrapper}>
          <div className={classes.imageContainer}>
            <Image
              src="/pp.png"
              alt="profile"
              width={150}
              height={150}
              priority
            />
          </div>
          <div className={classes.userInfoContainer}>
            {visible.input ? (
              <input
                className={classes.editableNameInput}
                type="text"
                name="name"
                onChange={(event) =>
                  setProfile((prev) => ({ ...prev, name: event.target.value }))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter")
                    setVisible((prev) => ({ ...prev, input: false }));
                }}
                value={profile.name}
                autoFocus
              />
            ) : (
              <h2>{profile.name}</h2>
            )}

            {visible.input ? (
              <input
                className={classes.editableJobInput}
                type="text"
                name="job"
                onChange={(event) =>
                  setProfile((prev) => ({ ...prev, job: event.target.value }))
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter")
                    setVisible((prev) => ({ ...prev, input: false }));
                }}
                value={profile.job}
              />
            ) : (
              <p>{profile.job}</p>
            )}
          </div>
          <div className={classes.optionsHr}>
            <hr className={classes.hr} />
            <h3>{texts[lang].options[0]}</h3>
          </div>
          <div className={classes.optionsMenuContainer}>
            {token && (
              <div className={classes.optionContainer}>
                <PlusCircle size={20} style={{ color: "#f8f8f8" }} />
                <Link href="/admin/projects/add-project">
                  {texts[lang].options[1]}
                </Link>
              </div>
            )}
            {token && (
              <div className={classes.optionContainer}>
                <SquarePen size={20} style={{ color: "#f8f8f8" }} />
                <Button
                  cancelButton
                  type="button"
                  onClick={() =>
                    setVisible((prev) => ({ ...prev, input: true }))
                  }
                >
                  {texts[lang].options[2]}
                </Button>
              </div>
            )}
            <div className={classes.optionContainer}>
              <Download size={20} style={{ color: "#f8f8f8" }} />
              <Link
                href="https://localhost:7178/api/project/download-cv"
                download="CV_Selim_POLAT.pdf"
                target="_blank"
                className={classes.button}
              >
                <span>{texts[lang].options[3]}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.projectMenu}>
        <div className={classes.sortContainer}>
          <div className={classes.sort}>
            <strong>{texts[lang].sorts[0]}: </strong>
            <div className={classes.dateContainer}>
              <p>{texts[lang].sorts[sortIndex]}</p>
            </div>
          </div>
          <div className={classes.filter}>
            <div
              className={`${classes.filterDiv} ${visible.sort ? classes.hidden : ""}`}
            >
              <SlidersHorizontal
                width={20}
                height={20}
                style={{ color: "#f8f8f8" }}
                onClick={() =>
                  setVisible((prev) => ({
                    ...prev,
                    filter: !prev.filter,
                    sort: false,
                  }))
                }
              />
              {visible.filter && (
                <div className={classes.filterButtonsContainer}>
                  {(filter.category || filter.status) && (
                    <div className={classes.clearFilterContainer}>
                      <Button
                        cancelButton
                        className={classes.clearFilterButton}
                        onClick={clearFilters}
                      >
                        <span style={{ color: "#ff9bb9", fontWeight: "bold" }}>
                          ✕{" "}
                          {lang === "tr"
                            ? "Filtreleri Temizle"
                            : "Clear Filters"}
                        </span>
                      </Button>
                      <hr
                        style={{
                          width: "90%",
                          height: "1px",
                          border: "none",
                          opacity: 0.1,
                          margin: "8px auto",
                          backgroundColor: "#f8f8f8",
                        }}
                      />
                    </div>
                  )}
                  <Button
                    cancelButton
                    onClick={() =>
                      setVisible((prev) => ({
                        ...prev,
                        categoryMenu: !prev.categoryMenu,
                      }))
                    }
                  >
                    <span>{texts[lang].filters[0]}</span>
                  </Button>
                  {visible.categoryMenu && (
                    <div className={classes.categoryContainer}>
                      {texts.en.categories.map((catName) => (
                        <Button
                          key={catName}
                          cancelButton
                          onClick={() => {
                            setFilter((prev) => ({
                              ...prev,
                              category: catName,
                            }));
                          }}
                          className={
                            filter.category === catName
                              ? classes.filterActive
                              : classes.filter
                          }
                        >
                          <span>{catName}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                  <Button
                    cancelButton
                    onClick={() =>
                      setVisible((prev) => ({
                        ...prev,
                        statusMenu: !prev.statusMenu,
                      }))
                    }
                  >
                    <span>{texts[lang].filters[1]}</span>
                  </Button>
                  {visible.statusMenu && (
                    <div className={classes.statusContainer}>
                      {texts.en.status.map((statusName, index) => (
                        <Button
                          key={index}
                          cancelButton
                          onClick={() => {
                            setFilter((prev) => ({
                              ...prev,
                              status: statusName,
                            }));
                          }}
                          className={
                            filter.status === statusName
                              ? classes.filterActive
                              : classes.filter
                          }
                        >
                          <span>{statusName}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div
              className={`${classes.sortDiv} ${visible.filter ? classes.hidden : ""}`}
            >
              <ListFilter
                width={20}
                height={20}
                style={{ color: "#f8f8f8" }}
                onClick={() =>
                  setVisible((prev) => ({
                    ...prev,
                    sort: !prev.sort,
                    filter: false,
                  }))
                }
              />
              {visible.sort && (
                <div className={classes.sortButtonsContainer}>
                  <Button
                    cancelButton
                    onClick={() => {
                      setOrder((prev) => ({
                        by: "Date",
                        descending: !prev.descending,
                      }));
                      setVisible((prev) => ({ ...prev, sort: false }));
                    }}
                  >
                    <span>{texts[lang].sorts[1]}</span>
                    {order.by === "Date" && (
                      <span className={classes.sortArrow}>
                        {order.descending ? "↓" : "↑"}
                      </span>
                    )}
                  </Button>
                  <Button
                    cancelButton
                    onClick={() => {
                      setOrder((prev) => ({
                        by: "Name",
                        descending: !prev.descending,
                      }));
                      setVisible((prev) => ({ ...prev, sort: false }));
                    }}
                  >
                    <span>{texts[lang].sorts[2]}</span>
                    {order.by === "Name" && (
                      <span className={classes.sortArrow}>
                        {order.descending ? "↓" : "↑"}
                      </span>
                    )}
                  </Button>
                  <Button
                    cancelButton
                    onClick={() => {
                      setOrder((prev) => ({
                        by: "Creator",
                        descending: !prev.descending,
                      }));
                      setVisible((prev) => ({ ...prev, sort: false }));
                    }}
                  >
                    <span>{texts[lang].sorts[3]}</span>
                    {order.by === "Creator" && (
                      <span className={classes.sortArrow}>
                        {order.descending ? "↓" : "↑"}
                      </span>
                    )}
                  </Button>

                  <Button
                    cancelButton
                    onClick={() => {
                      setOrder((prev) => ({
                        by: "Category",
                        descending: !prev.descending,
                      }));
                      setVisible((prev) => ({ ...prev, sort: false }));
                    }}
                  >
                    <span>{texts[lang].sorts[4]}</span>
                    {order.by === "Category" && (
                      <span className={classes.sortArrow}>
                        {order.descending ? "↓" : "↑"}
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={classes.projectCartContainer}>
          <div className={classes.projectCart}>
            {data?.result?.map((project) => (
              <ProjectCart
                key={project.id}
                project={project}
                onClick={() => openProjectPanel(project.id)}
                src={`https://localhost:7178${project.imageUrl}`}
                className={projectStyles[project.id]}
              />
            ))}
          </div>
        </div>
      </div>
      {clickProject && (
        <Project projectId={clickedProjectId} onClose={closeProjectPanel} />
      )}
    </div>
  );
}
