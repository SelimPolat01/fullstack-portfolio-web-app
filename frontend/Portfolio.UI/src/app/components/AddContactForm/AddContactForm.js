"use client";

import { useContext, useMemo, useState } from "react";
import classes from "./AddContactForm.module.css";
import { LangContext } from "@/contexts/LangContext";
import { usePostMessage } from "@/hooks/POST/usePostMessage";
import { useRouter } from "next/navigation";
import { ArrowDown, Mail, MapPin, Phone } from "lucide-react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import TextArea from "../TextArea/TextArea";
import { AnimatePresence, motion } from "framer-motion";
import {
  dropdownVariants,
  formElementVariants,
  formVariants,
  textContainerVariants,
  textVariants,
} from "@/lib/variants";
import SuccessMessage from "../SuccessMessage/SuccessMessage";

export default function AddContactForm() {
  const router = useRouter();
  const { lang, toggleLang } = useContext(LangContext);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [subjectTouched, setSubjectTouched] = useState(false);
  const { mutate, isPending, isError, error } = usePostMessage();
  const [selected, setSelected] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const texts = {
    tr: {
      h1: "Bana mesaj bırak",
      p: "Şu anda yazılım geliştiricisi olarak staj fırsatları ile birlikte freelance veya iş birliği projeleri arıyorum. Eğer herhangi bir sorunuz, proje fikriniz veya fırsatınız varsa, bana mesaj göndermekten çekinmeyin. En kısa sürede geri dönüş yapacağım.",
      labels: [
        "İsim",
        "Soyisim",
        "Eposta",
        "Telefon Numarası",
        "Konu",
        "Mesaj",
      ],
      selects: [
        "Genel Soru",
        "Teknik Soru",
        "Iş Fırsatı",
        "Staj Teklifi",
        "Serbest Çalışma",
        "Geri Bildirim",
        "Lütfen Seçiniz",
      ],
      button: ["Yükleniyor...", "Gönder"],
      contactMe: "Bana Ulaş",
      successMessageTitle: "Mesaj Alındı",
      successMessageText: "En Kısa Sürede Dönüş Yapılacaktır",
      successMessageButtonText: "Yeni Bir Mesaj Gönder",
    },
    en: {
      h1: "Drop me a message",
      p: "I’m currently looking for internship opportunities as a software developer, along with freelance or collaboration projects. If you have any questions, project ideas, or opportunities, feel free to send a message. I’ll respond as soon as possible.",
      labels: [
        "Name",
        "Surname",
        "Email",
        "Phone Number",
        "Subject",
        "Message",
      ],
      selects: [
        "General Question",
        "Technical Question",
        "Job Opportunity",
        "Internship Offer",
        "Freelance Work",
        "Feedback",
        "Please Select",
      ],
      button: ["Loading", "Send"],
      contactMe: "Contact Me",
      successMessageTitle: "Message Received",
      successMessageText: "We Will Get Back To You As Soon As Possible",
      successMessageButtonText: "Send A New Message",
    },
  };
  const [input, setInput] = useState({
    name: {
      letters: "",
      isBlur: false,
    },
    surname: {
      letters: "",
      isBlur: false,
    },
    email: {
      letters: "",
      isBlur: false,
    },
    phoneNumber: {
      letters: "",
      isBlur: false,
    },
    text: {
      letters: "",
      isBlur: false,
    },
  });

  function validate(input, selected) {
    const errors = {};
    if (!input.name.letters.trim()) errors.name = "Name is required";
    if (!input.surname.letters.trim()) errors.surname = "Surname is required";
    if (
      !input.email.letters.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.letters)
    )
      errors.email = "Email is invalid format";
    if (!/^\+90\d{10}$/.test(input.phoneNumber.letters))
      errors.phoneNumber = "Phone number is invalid format";
    if (!selected) errors.subject = "Subject is required";
    if (!input.text.letters.trim() || input.text.letters.length < 5)
      errors.text = "Text is required";
    return errors;
  }

  const currentErrors = useMemo(
    () => validate(input, selected),
    [input, selected],
  );

  function changeHandler(event) {
    setInput((prev) => ({
      ...prev,
      [event.target.name]: { letters: event.target.value, isBlur: false },
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

  async function submitHandler(event) {
    event.preventDefault();
    if (Object.keys(currentErrors).length > 0) {
      setInput((prev) => ({
        ...prev,
        name: { ...prev.name, isBlur: true },
        surname: { ...prev.surname, isBlur: true },
        email: { ...prev.email, isBlur: true },
        phoneNumber: { ...prev.phoneNumber, isBlur: true },
        text: { ...prev.text, isBlur: true },
      }));
      setIsOpenDropdown(false);
      setSubjectTouched(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }
    mutate(
      {
        body: {
          name: input.name.letters,
          surname: input.surname.letters,
          email: input.email.letters,
          phoneNumber: input.phoneNumber.letters,
          subject: selected,
          text: input.text.letters,
        },
      },
      {
        onSuccess: () => {
          setInput({
            name: { letters: "", isBlur: false },
            surname: { letters: "", isBlur: false },
            email: { letters: "", isBlur: false },
            phoneNumber: { letters: "", isBlur: false },
            subject: selected,
            text: { letters: "", isBlur: false },
          });
          setSelected(null);
          setSubjectTouched(false);
          setIsSuccess(true);
        },
      },
      {
        onError: (err) => {
          console.log(err);
          router.replace("/error");
          return;
        },
      },
    );
  }

  return (
    <div className={classes.div} onClick={() => setIsOpenDropdown(false)}>
      <motion.div
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
        className={classes.contactContainer}
      >
        <motion.div variants={textVariants} className={classes.contactText}>
          <h1>{texts[lang].h1}</h1>
          <p>{texts[lang].p}</p>
        </motion.div>
        <motion.div variants={textVariants} className={classes.contactItem}>
          <Phone
            className={classes.contactIcon}
            size={32}
            stroke="url(#magic-gradient)"
          />
          <span>+90 537 304 5229</span>
        </motion.div>
        <motion.div variants={textVariants} className={classes.contactItem}>
          <Mail
            className={classes.contactIcon}
            size={32}
            stroke="url(#magic-gradient)"
          />
          <span>selim.polat.29@outlook.com</span>
        </motion.div>
        <motion.div variants={textVariants} className={classes.contactItem}>
          <MapPin
            className={classes.contactIcon}
            size={32}
            stroke="url(#magic-gradient)"
          />
          <span>
            Mehmet Akif Mah./ Halil İbrahim Cad./ No: 59/ Sultanbeyli / Istanbul
          </span>
        </motion.div>
      </motion.div>
      <div className={classes.formWrapper}>
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form
              key="contact-form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={submitHandler}
              className={classes.form}
            >
              <motion.h1
                variants={formElementVariants}
                className={classes.contactMe}
              >
                {texts[lang].contactMe}
              </motion.h1>
              <div className={classes.equal}>
                <motion.div
                  variants={formElementVariants}
                  className={classes.labelInput}
                >
                  <label htmlFor="name">{texts[lang].labels[0]}</label>
                  <Input
                    type="text"
                    name="name"
                    className={`${input.name.isBlur && currentErrors.name ? classes.error : ""} ${isShaking && currentErrors.name ? classes.shake : ""}`}
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
                  <label htmlFor="surname">{texts[lang].labels[1]}</label>
                  <Input
                    type="text"
                    name="surname"
                    className={`${input.surname.isBlur && currentErrors.surname ? classes.error : ""} ${isShaking && currentErrors.surname ? classes.shake : ""}`}
                    onFocus={focusHandler}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    value={input.surname.letters}
                  />
                  {input.surname.isBlur && currentErrors.surname && (
                    <span className="errorSpan">{currentErrors.surname}</span>
                  )}
                </motion.div>
              </div>
              <motion.div
                variants={formElementVariants}
                className={classes.labelInput}
              >
                <label htmlFor="email">{texts[lang].labels[2]}</label>
                <Input
                  type="email"
                  name="email"
                  className={`${input.email.isBlur && currentErrors.email ? classes.error : ""} ${isShaking && currentErrors.email ? classes.shake : ""}`}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                  value={input.email.letters}
                />
                {input.email.isBlur && currentErrors.email && (
                  <span className="errorSpan">{currentErrors.email}</span>
                )}
              </motion.div>
              <div className={classes.equal}>
                <motion.div
                  variants={formElementVariants}
                  className={classes.labelInput}
                >
                  <label htmlFor="phoneNumber">{texts[lang].labels[3]}</label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    className={`${input.phoneNumber.isBlur && currentErrors.phoneNumber ? classes.error : ""} ${isShaking && currentErrors.phoneNumber ? classes.shake : ""}`}
                    onFocus={focusHandler}
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    value={input.phoneNumber.letters}
                    placeholder="(+90) XXX XXX XXXX"
                  />
                  {input.phoneNumber.isBlur && currentErrors.phoneNumber && (
                    <span className="errorSpan">
                      {currentErrors.phoneNumber}
                    </span>
                  )}
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
                </motion.div>
                <motion.div
                  variants={formElementVariants}
                  className={classes.labelInput}
                >
                  <label>{texts[lang].labels[4]}</label>
                  <div
                    onClick={(event) => {
                      setIsOpenDropdown(true);
                      setSubjectTouched(true);
                      event.stopPropagation();
                    }}
                    className={`${classes.selectContainer} ${subjectTouched && currentErrors.subject ? classes.error : ""} ${isShaking && currentErrors.subject ? classes.shake : ""}`}
                  >
                    <div className={classes.selectArrowContainer}>
                      <motion.h2 className={classes.pleaseSelect}>
                        {selected == null
                          ? `${texts[lang].selects[6]}`
                          : selected}
                      </motion.h2>
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
                      {isOpenDropdown && (
                        <motion.div
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className={classes.optionsContainer}
                          style={{ originY: 0 }}
                        >
                          <ul>
                            <li
                              onClick={(event) => {
                                setSelected("General Question");
                                event.stopPropagation();
                                setIsOpenDropdown(false);
                              }}
                            >
                              {texts[lang].selects[0]}
                            </li>
                            <li
                              onClick={(event) => {
                                setSelected("Technical Question");
                                event.stopPropagation();
                                setIsOpenDropdown(false);
                              }}
                            >
                              {texts[lang].selects[1]}
                            </li>
                            <li
                              onClick={(event) => {
                                setSelected("Job Opportunity");
                                event.stopPropagation();
                                setIsOpenDropdown(false);
                              }}
                            >
                              {texts[lang].selects[2]}
                            </li>
                            <li
                              onClick={(event) => {
                                setSelected("Internship Offer");
                                event.stopPropagation();
                                setIsOpenDropdown(false);
                              }}
                            >
                              {texts[lang].selects[3]}
                            </li>
                            <li
                              onClick={(event) => {
                                setSelected("Freelance Work");
                                event.stopPropagation();
                                setIsOpenDropdown(false);
                              }}
                            >
                              {texts[lang].selects[4]}
                            </li>
                            <li
                              onClick={(event) => {
                                setSelected("Feedback");
                                event.stopPropagation();
                                setIsOpenDropdown(false);
                              }}
                            >
                              {texts[lang].selects[5]}
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {subjectTouched && currentErrors.subject && (
                    <span className="errorSpan">{currentErrors.subject}</span>
                  )}
                </motion.div>
              </div>
              <motion.div
                variants={formElementVariants}
                className={classes.labelInput}
              >
                <label htmlFor="text">{texts[lang].labels[5]}</label>
                <TextArea
                  name="text"
                  className={`${classes.textarea} ${input.text.isBlur && currentErrors.text ? classes.error : ""} ${isShaking && currentErrors.text ? classes.shake : ""}`}
                  onFocus={focusHandler}
                  onChange={changeHandler}
                  onBlur={blurHandler}
                  rows={5}
                  value={input.text.letters}
                />
                {input.text.isBlur && currentErrors.text && (
                  <span className="errorSpan">{currentErrors.text}</span>
                )}
              </motion.div>
              <motion.div variants={formElementVariants}>
                <Button disabled={isPending} whileTap={{ scale: 0.95 }}>
                  {isPending ? texts[lang].button[0] : texts[lang].button[1]}
                </Button>
              </motion.div>
            </motion.form>
          ) : (
            <SuccessMessage
              key="success-message"
              onClick={() => setIsSuccess(false)}
              title={texts[lang].successMessageTitle}
              text={texts[lang].successMessageText}
              buttonText={texts[lang].successMessageButtonText}
              className={classes.form}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
