"use client";

import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Input from "../Input/Input";
import { LangContext } from "@/contexts/LangContext";
import { useRouter } from "next/navigation";
import TextArea from "../TextArea/TextArea";
import classes from "./ProjectForm.module.css";
import Button from "../Button/Button";
import { ArrowDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  dropdownVariants,
  formElementVariants,
  formVariants,
  textVariants,
} from "@/lib/variants";
import SuccessMessage from "../SuccessMessage/SuccessMessage";

export default function ProjectForm({
  onSubmitForm,
  isPending,
  initialData,
  addProject,
  editProject,
  isSuccess,
  setIsSuccess,
}) {
  const router = useRouter();
  const imageInputRef = useRef(null);
  const [isShaking, setIsShaking] = useState(false);
  const [token, setToken] = useState(null);
  const [date, setDate] = useState(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState({
    category: false,
    status: false,
  });
  const [touched, setTouched] = useState({
    category: false,
    status: false,
    img: false,
    date: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selected, setSelected] = useState({
    category: "",
    status: "",
  });
  const [input, setInput] = useState({
    name: {
      letters: "",
      isBlur: false,
    },
    shortDesc: {
      letters: "",
      isBlur: false,
    },
    longDesc: {
      letters: "",
      isBlur: false,
    },
    techs: {
      letters: "",
      tags: [],
      isBlur: false,
    },
    features: {
      letters: "",
      tags: [],
      isBlur: false,
    },
    creator: {
      letters: "",
      isBlur: false,
    },
    githubLink: {
      letters: "",
      isBlur: false,
    },
    image: {
      letters: "",
      isBlur: false,
    },
  });

  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (!currentToken) {
      router.replace("/admin/login");
      return;
    }
  }, [router]);

  useEffect(() => {
    if (initialData) {
      setInput((prev) => ({
        ...prev,
        name: { ...prev.name, letters: initialData.name || "" },
        shortDesc: { ...prev.shortDesc, letters: initialData.shortDesc || "" },
        longDesc: { ...prev.longDesc, letters: initialData.longDesc || "" },
        techs: { ...prev.techs, tags: initialData.techs || [] },
        features: { ...prev.features, tags: initialData.features || [] },
        creator: { ...prev.creator, letters: initialData.creator || "" },
        githubLink: {
          ...prev.githubLink,
          letters: initialData.githubLink || "",
        },
      }));

      setSelected({
        category: initialData.category || "",
        status: initialData.status || "",
      });

      if (initialData.date) {
        setDate(new Date(initialData.date));
      }

      if (initialData.imageUrl) {
        setPreview(`https://localhost:7178${initialData.imageUrl}`);
      }
    }
  }, [initialData]);

  let texts = {};
  if (addProject) {
    texts = {
      tr: {
        h1: "Proje Ekle",
        labels: [
          "İsim",
          "Kısa Açıklama",
          "GitHub Bağlantısı",
          "Kategori",
          "Durum",
          "Fotoğraf",
          "Tarih",
          "Uzun Açıklama",
          "Oluşturucu",
        ],
        selectText: "Lütfen Seçiniz",
        techText: "Teknolojiyi yazıp Enter'a basınız",
        featureText: "Özelliği yazıp Enter'a basınız",
        categories: [
          "Tam Yığın",
          "Arka Uç",
          "Ön Uç",
          "Derin Öğrenme",
          "Makine Öğrenmesi",
          "Mobil Uygulama",
          "Siber Güvenlik",
        ],
        situations: ["Bitmedi", "Bitti"],
        buttonTexts: ["Ekleniyor...", "Ekle"],
        successMessageTitle: "Eklendi!",
        successMessageText:
          "Proje bilgileri başarıyla güncellendi. Portfolyon taptaze duruyor!",
        successMessageButtonText: "Projelerim'e Git",
      },
      en: {
        h1: "Add Project",
        labels: [
          "Name",
          "Short Description",
          "GitHub Link",
          "Category",
          "Status",
          "Image",
          "Date",
          "Long Description",
          "Creator",
        ],
        selectText: "Please Select",
        techText: "Type technology and press Enter",
        featureText: "Type feature and press Enter",
        categories: [
          "Full Stack",
          "Backend",
          "Frontend",
          "Deep Learning",
          "Machine Learning",
          "Mobile Application",
          "Cyber Security",
        ],
        situations: ["Not Finished", "Finished"],
        buttonTexts: ["Adding...", "Add"],
        successMessageTitle: "Added",
        successMessageText:
          "Your new project has been successfully included in your portfolio. Ready to share with the world!",
        successMessageButtonText: "Go To My Projects",
      },
    };
  } else if (editProject) {
    texts = {
      tr: {
        h1: "Projeyi Düzenle",
        labels: [
          "İsim",
          "Kısa Açıklama",
          "GitHub Bağlantısı",
          "Kategori",
          "Durum",
          "Fotoğraf",
          "Tarih",
          "Uzun Açıklama",
          "Oluşturucu",
        ],
        selectText: "Lütfen Seçiniz",
        techText: "Teknolojiyi yazıp Enter'a basınız",
        featureText: "Özelliği yazıp Enter'a basınız",
        categories: [
          "Tam Yığın",
          "Arka Uç",
          "Ön Uç",
          "Derin Öğrenme",
          "Makine Öğrenmesi",
          "Mobil",
          "Siber Güvenlik",
        ],
        situations: ["Bitmedi", "Bitti"],
        buttonTexts: ["Ekleniyor...", "Ekle"],
        successMessageTitle: "Düzenlendi!",
        successMessageText:
          "Proje bilgileri başarıyla güncellendi. Portfolyon taptaze duruyor!r",
        successMessageButtonText: "Projelerim'e Git",
      },
      en: {
        h1: "Edit Project",
        labels: [
          "Name",
          "Short Description",
          "GitHub Link",
          "Category",
          "Status",
          "Image",
          "Date",
          "Long Description",
          "Creator",
        ],
        selectText: "Please Select",
        techText: "Type technology and press Enter",
        featureText: "Type feature and press Enter",
        categories: [
          "Full Stack",
          "Backend",
          "Frontend",
          "Deep Learning",
          "Machine Learning",
          "Mobile",
          "Cyber Security",
        ],
        situations: ["Not Finished", "Finished"],
        buttonTexts: ["Editting...", "Edit"],
        successMessageTitle: "Updated!",
        successMessageText:
          "Project information has been successfully updated. Your portfolio looks fresh!",
        successMessageButtonText: "Go To My Projects",
      },
    };
  }

  const indexes = {
    category: {
      "Full Stack": 0,
      Backend: 1,
      Frontend: 2,
      "Deep Learning": 3,
      "Machine Learning": 4,
      Mobile: 5,
      "Cyber Security": 6,
    },
    status: {
      "Not Finished": 0,
      Finished: 1,
    },
  };

  const index = {
    category: indexes.category[selected.category],
    status: indexes.status[selected.status],
  };

  const { lang, toggleLang } = useContext(LangContext);

  function validate(input, selected, date, imageFile, preview) {
    const errors = {};
    if (
      !input.name.letters.trim() ||
      input.name.letters.length < 3 ||
      input.name.letters.length > 100
    )
      errors.name = "Name is required";
    if (
      !input.shortDesc.letters.trim() ||
      input.shortDesc.letters.length < 5 ||
      input.shortDesc.letters.length > 400
    )
      errors.shortDesc =
        "Short description must be between 5 and 400 characters.";
    if (!input.longDesc.letters.trim() || input.longDesc.letters.length < 10)
      errors.longDesc =
        "Long description is required and must be at least 10 characters.";
    if (input.techs.tags.length == 0) errors.techs = "Techs is required";
    if (input.features.tags.length == 0)
      errors.features = "Features is required";
    if (!input.creator.letters.trim()) errors.creator = "Creator is required.";
    if (!input.githubLink.letters.trim())
      errors.githubLink = "GitHub link is required.";
    if (!imageFile && !preview) errors.imageFile = "Image is required.";
    if (!selected.category) errors.category = "Category is required";
    if (!selected.status) errors.status = "Status is required";
    if (!date) errors.date = "Date is required";
    return errors;
  }

  const currentErrors = useMemo(
    () => validate(input, selected, date, imageFile, preview),
    [input, selected, date],
  );

  function changeHandler(event) {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: {
        ...prev[event.target.name],
        letters: event.target.value,
      },
    }));
  }

  function blurHandler(event) {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: { ...prev[event.target.name], isBlur: true },
    }));
  }

  function focusHandler(event) {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: { ...prev[event.target.name], isBlur: false },
    }));
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    setImageFile(file);
    setTouched((prev) => ({ ...prev, img: false }));
    setPreview(URL.createObjectURL(file));
    if (!file) return;
  }

  function handleKeyDown(event) {
    if (event.key == "Enter") {
      const name = event.target.name;
      event.preventDefault();
      const value = input[name].letters.trim();
      if (!value || input[name].tags.includes(value)) return;
      setInput((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          tags: [...prev[name].tags, value],
          letters: "",
        },
      }));
    }
  }

  function removeTechTag(indexToRemove) {
    setInput((prev) => ({
      ...prev,
      techs: {
        ...prev.techs,
        tags: [
          ...prev.techs.tags.filter((tag, index) => index != indexToRemove),
        ],
      },
    }));
  }

  function removeFeatureTag(indexToRemove) {
    setInput((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        tags: [
          ...prev.features.tags.filter((tag, index) => index != indexToRemove),
        ],
      },
    }));
  }

  async function submitHandler(event) {
    if (!token) return;
    event.preventDefault();
    if (Object.keys(currentErrors).length > 0) {
      setInput((prev) => ({
        ...prev,
        name: { ...prev.name, isBlur: true },
        shortDesc: { ...prev.shortDesc, isBlur: true },
        longDesc: { ...prev.longDesc, isBlur: true },
        techs: { ...prev.techs, isBlur: true },
        features: { ...prev.features, isBlur: true },
        creator: { ...prev.creator, isBlur: true },
        githubLink: { ...prev.githubLink, isBlur: true },
        image: { ...prev.image, isBlur: true },
      }));
      setTouched({ category: true, status: true, img: true, date: true });
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }
    const formData = new FormData();
    formData.append("Name", input.name.letters);
    formData.append("ShortDesc", input.shortDesc.letters);
    formData.append("LongDesc", input.longDesc.letters);
    formData.append("creator", input.creator.letters);
    formData.append("GithubLink", input.githubLink.letters);
    formData.append("Category", selected.category);
    formData.append("Status", selected.status);
    formData.append("Date", date.toISOString());
    if (imageFile) formData.append("Image", imageFile);

    input.techs.tags.forEach((tech) => {
      formData.append("Techs", tech);
    });
    input.features.tags.forEach((feature) => {
      formData.append("Features", feature);
    });
    onSubmitForm(formData);
    setInput({
      name: {
        letters: "",
        isBlur: false,
      },
      shortDesc: {
        letters: "",
        isBlur: false,
      },
      longDesc: {
        letters: "",
        isBlur: false,
      },
      techs: {
        tags: [],
        letters: "",
        isBlur: false,
      },
      features: {
        tags: [],
        letters: "",
        isBlur: false,
      },
      creator: {
        letters: "",
        isBlur: false,
      },
      githubLink: {
        letters: "",
        isBlur: false,
      },
      image: {
        letters: "",
        isBlur: false,
      },
    });
    setSelected({ category: "", status: "" });
    setImageFile(null);
    setPreview(null);
    setDate(null);
  }

  return (
    <div
      className={classes.div}
      onClick={() =>
        setIsOpenDropdown({
          category: false,
          status: false,
        })
      }
    >
      {!isSuccess && (
        <motion.h1 variants={textVariants} className={classes.addProjects}>
          {texts[lang].h1}
        </motion.h1>
      )}

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="project-form"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            className={classes.form}
            onSubmit={submitHandler}
          >
            <div className={classes.subDivContainer}>
              <motion.div
                variants={formElementVariants}
                className={classes.labelInput}
              >
                <label htmlFor="name">{texts[lang].labels[0]}</label>
                <Input
                  type="text"
                  name="name"
                  className={`${classes.input} ${input.name.isBlur && currentErrors.name ? classes.error : ""} ${isShaking && currentErrors.name ? classes.shake : ""}`}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                  value={input.name.letters}
                />
                {input.name.isBlur && currentErrors.name && (
                  <span className="errorSpan">{currentErrors.name}</span>
                )}
              </motion.div>
              <motion.div
                variants={formElementVariants}
                className={classes.labelInput}
              >
                <label htmlFor="shortDesc">{texts[lang].labels[1]}</label>
                <TextArea
                  type="text"
                  name="shortDesc"
                  rows={5}
                  className={`${classes.shortTextArea} ${input.shortDesc.isBlur && currentErrors.shortDesc ? classes.error : ""} ${isShaking && currentErrors.shortDesc ? classes.shake : ""}`}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                  value={input.shortDesc.letters}
                />
                {input.shortDesc.isBlur && currentErrors.shortDesc && (
                  <span className="errorSpan">{currentErrors.shortDesc}</span>
                )}
              </motion.div>
              <motion.div
                variants={formElementVariants}
                className={classes.labelInput}
              >
                <label htmlFor="githubLink">{texts[lang].labels[2]}</label>
                <Input
                  type="text"
                  name="githubLink"
                  className={`${classes.input} ${input.githubLink.isBlur && currentErrors.githubLink ? classes.error : ""} ${isShaking && currentErrors.githubLink ? classes.shake : ""}`}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                  value={input.githubLink.letters}
                  placeholder="https://github.com/user/project"
                />
                {input.githubLink.isBlur && currentErrors.githubLink && (
                  <span className="errorSpan">{currentErrors.githubLink}</span>
                )}
              </motion.div>
              <div className={classes.selectDiv}>
                <div className={classes.labelInputContainer}>
                  <motion.div
                    variants={formElementVariants}
                    className={classes.labelInput}
                  >
                    <label htmlFor="category">{texts[lang].labels[3]}</label>
                    <div
                      onClick={(event) => {
                        setIsOpenDropdown((prev) => ({
                          ...prev,
                          category: true,
                        }));
                        setTouched((prev) => ({ ...prev, category: true }));
                        event.stopPropagation();
                      }}
                      className={`${classes.selectContainer} ${touched.category && currentErrors.category ? classes.error : ""} ${isShaking && currentErrors.category ? classes.shake : ""}`}
                    >
                      <div className={classes.selectArrowContainer}>
                        <h2 className={classes.pleaseSelect}>
                          {selected.category === ""
                            ? `${texts[lang].selectText}`
                            : `${texts[lang].categories[index.category]}`}
                        </h2>
                        <Button
                          type="button"
                          className={classes.arrowButton}
                          cancelButton
                        >
                          <ArrowDown
                            className={classes.arrow}
                            size={25}
                            stroke="url(#magic-gradient)"
                          />
                        </Button>
                      </div>
                      <AnimatePresence>
                        {isOpenDropdown.category && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={classes.optionsContainer}
                            style={{ originY: 0 }}
                          >
                            <ul>
                              {texts.en.categories.map((category, index) => (
                                <li
                                  key={index}
                                  onClick={(event) => {
                                    setSelected((prev) => ({
                                      ...prev,
                                      category: category,
                                    }));
                                    event.stopPropagation();
                                    setIsOpenDropdown((prev) => ({
                                      ...prev,
                                      category: false,
                                    }));
                                  }}
                                >
                                  {texts[lang].categories[index]}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                  {touched.category && currentErrors.category && (
                    <span className="errorSpan">{currentErrors.category}</span>
                  )}
                </div>
                <div className={classes.labelInputContainer}>
                  <motion.div
                    variants={formElementVariants}
                    className={classes.labelInput}
                  >
                    <label htmlFor="status">{texts[lang].labels[4]}</label>
                    <div
                      onClick={(event) => {
                        setIsOpenDropdown((prev) => ({
                          ...prev,
                          status: true,
                        }));
                        setTouched((prev) => ({ ...prev, status: true }));
                        event.stopPropagation();
                      }}
                      className={`${classes.selectContainer} ${touched.status && currentErrors.status ? classes.error : ""} ${isShaking && currentErrors.status ? classes.shake : ""}`}
                    >
                      <div className={classes.selectArrowContainer}>
                        <h2 className={classes.pleaseSelect}>
                          {selected.status === ""
                            ? `${texts[lang].selectText}`
                            : `${texts[lang].situations[index.status]}`}
                        </h2>
                        <Button
                          type="button"
                          className={classes.arrowButton}
                          cancelButton
                        >
                          <ArrowDown
                            className={classes.arrow}
                            size={25}
                            stroke="url(#magic-gradient)"
                          />
                        </Button>
                      </div>
                      <AnimatePresence>
                        {isOpenDropdown.status && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={classes.optionsContainer}
                            style={{ originY: 0 }}
                          >
                            <ul>
                              {texts.en.situations.map((situation, index) => (
                                <li
                                  key={index}
                                  onClick={(event) => {
                                    setSelected((prev) => ({
                                      ...prev,
                                      status: situation,
                                    }));
                                    event.stopPropagation();
                                    setIsOpenDropdown((prev) => ({
                                      ...prev,
                                      status: false,
                                    }));
                                  }}
                                >
                                  {texts[lang].situations[index]}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                  {touched.status && currentErrors.status && (
                    <span className="errorSpan">{currentErrors.status}</span>
                  )}
                </div>
              </div>
              <div className={classes.dateImageContainer}>
                <motion.div
                  variants={formElementVariants}
                  className={classes.labelInput}
                >
                  <label htmlFor="image">{texts[lang].labels[5]}</label>
                  <div
                    className={`${classes.imageFile} ${touched.img && currentErrors.imageFile ? classes.error : ""} ${isShaking && currentErrors.imageFile ? classes.shake : ""}`}
                    onClick={() => {
                      imageInputRef.current?.click();
                      setTouched((prev) => ({ ...prev, img: true }));
                    }}
                  >
                    {preview && (
                      <img
                        className={classes.preview}
                        src={preview}
                        alt="project image"
                      />
                    )}
                  </div>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className={classes.hiddenInput}
                    onChange={handleFileChange}
                    ref={imageInputRef}
                  />
                  {touched.img &&
                    input.image.isBlur &&
                    currentErrors.imageFile && (
                      <span className="errorSpan">
                        {currentErrors.imageFile}
                      </span>
                    )}
                </motion.div>
                <motion.div
                  variants={formElementVariants}
                  className={classes.labelInput}
                >
                  <label htmlFor="date">{texts[lang].labels[6]}</label>
                  <div
                    className={`${classes.dateContainer} ${touched.date && currentErrors.date ? classes.error : ""} ${isShaking && currentErrors.date ? classes.shake : ""}`}
                    onClick={() =>
                      setTouched((prev) => ({ ...prev, date: true }))
                    }
                  >
                    <DatePicker
                      selected={date}
                      onChange={(d) => setDate(d)}
                      className={classes.date}
                      dateFormat="yyyy-MM-dd"
                      inline
                    />
                  </div>
                  {touched.date && currentErrors.date && (
                    <span className="errorSpan">{currentErrors.date}</span>
                  )}
                </motion.div>
              </div>
            </div>
            <div className={classes.subDivContainer}>
              <motion.div
                variants={formElementVariants}
                className={classes.labelInput}
              >
                <label htmlFor="longDesc">{texts[lang].labels[7]}</label>
                <TextArea
                  type="text"
                  rows={13}
                  name="longDesc"
                  className={`${classes.longTextArea} ${input.longDesc.isBlur && currentErrors.longDesc ? classes.error : ""} ${isShaking && currentErrors.longDesc ? classes.shake : ""}`}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                  value={input.longDesc.letters}
                />
                {input.longDesc.isBlur && currentErrors.longDesc && (
                  <span className="errorSpan">{currentErrors.longDesc}</span>
                )}
              </motion.div>
              <motion.div
                variants={formElementVariants}
                className={classes.tagWrapper}
              >
                <div
                  className={`${classes.tagContainer} ${input.techs.isBlur && currentErrors.techs ? classes.error : ""} ${isShaking && currentErrors.techs ? classes.shake : ""}`}
                >
                  <div className={classes.tags}>
                    {input.techs.tags.map((tag, index) => (
                      <div key={index} className={classes.tagDiv}>
                        <Button
                          type="button"
                          cancelButton
                          onClick={() => removeTechTag(index)}
                          className={classes.tagButton}
                        >
                          <span>{tag}</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Input
                    type="text"
                    name="techs"
                    className={`${classes.tagInput} ${input.techs.isBlur && currentErrors.techs ? classes.error : ""} ${isShaking && currentErrors.techs ? classes.shake : ""}`}
                    value={input.techs.letters}
                    onChange={changeHandler}
                    onKeyDown={handleKeyDown}
                    placeholder={texts[lang].techText}
                  />
                  {input.techs.isBlur && currentErrors.techs && (
                    <span className="errorSpan">{currentErrors.techs}</span>
                  )}
                </div>
                <div
                  className={`${classes.featureContainer} ${input.features.isBlur && currentErrors.features ? classes.error : ""} ${isShaking && currentErrors.features ? classes.shake : ""}`}
                >
                  <div className={classes.tags}>
                    {input.features.tags.map((tag, index) => (
                      <div key={index} className={classes.tagDiv}>
                        <Button
                          type="button"
                          cancelButton
                          onClick={() => removeFeatureTag(index)}
                          className={classes.tagButton}
                        >
                          <span>{tag}</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Input
                    type="text"
                    name="features"
                    className={`${classes.tagInput} ${input.features.isBlur && currentErrors.features ? classes.error : ""} ${isShaking && currentErrors.features ? classes.shake : ""}`}
                    value={input.features.letters}
                    onChange={changeHandler}
                    onKeyDown={handleKeyDown}
                    placeholder={texts[lang].featureText}
                  />
                  {input.features.isBlur && currentErrors.features && (
                    <span className="errorSpan">{currentErrors.features}</span>
                  )}
                </div>
              </motion.div>
              <motion.div
                variants={formElementVariants}
                className={classes.labelInput}
              >
                <label htmlFor="creator">{texts[lang].labels[8]}</label>
                <Input
                  type="text"
                  name="creator"
                  className={`${classes.input} ${input.creator.isBlur && currentErrors.creator ? classes.error : ""} ${isShaking && currentErrors.creator ? classes.shake : ""}`}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                  value={input.creator.letters}
                />
                {input.creator.isBlur && currentErrors.creator && (
                  <span className="errorSpan">{currentErrors.creator}</span>
                )}
              </motion.div>
              <motion.div variants={formElementVariants}>
                <Button
                  type="submit"
                  className={classes.button}
                  disabled={isPending}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>
                    {isPending
                      ? `${texts[lang].buttonTexts[0]}`
                      : `${texts[lang].buttonTexts[1]}`}
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.form>
        ) : (
          <SuccessMessage
            key="success-form"
            onClick={() => {
              setIsSuccess(false);
              router.push("/admin/projects");
            }}
            title={texts[lang].successMessageTitle}
            text={texts[lang].successMessageText}
            buttonText={texts[lang].successMessageButtonText}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
