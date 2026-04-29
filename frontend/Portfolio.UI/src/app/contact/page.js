"use client";

import { useContext, useMemo, useState } from "react";
import classes from "./Contact.module.css";
import Button from "../components/Button";
import Input from "../components/Input";
import { Phone, Mail, MapPin, ArrowDown } from "lucide-react";
import { usePostMessage } from "../../hooks/usePostMessage";
import { useRouter } from "next/navigation";
import { LangContext } from "@/contexts/LangContext";

export default function Home() {
  const { mutate, isPending, isError, error } = usePostMessage();
  const router = useRouter();
  const { lang, toggleLang } = useContext(LangContext);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [selected, setSelected] = useState("");
  const [isShaking, setIsShaking] = useState(false);
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
    if (!input.text.letters.trim()) errors.text = "Text is required";
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
        token: localStorage.getItem("token"),
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
          setSelected("");
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
    <>
      {isError && <p className={classes.backendError}>{error?.message}</p>}
      <div className={classes.div} onClick={() => setIsOpenDropdown(false)}>
        <div className={classes.contactContainer}>
          <div className={classes.contactText}>
            <h1>{texts[lang].h1}</h1>
            <p>{texts[lang].p}</p>
          </div>
          <div className={classes.contactItem}>
            <Phone
              className={classes.contactIcon}
              size={32}
              stroke="url(#magic-gradient)"
            />
            <span>+90 537 304 5229</span>
          </div>
          <div className={classes.contactItem}>
            <Mail
              className={classes.contactIcon}
              size={32}
              stroke="url(#magic-gradient)"
            />
            <span>selim.polat.29@outlook.com</span>
          </div>
          <div className={classes.contactItem}>
            <MapPin
              className={classes.contactIcon}
              size={32}
              stroke="url(#magic-gradient)"
            />
            <span>
              Mehmet Akif Mah./ Halil İbrahim Cad./ No: 59/ Sultanbeyli /
              Istanbul
            </span>
          </div>
        </div>
        <form onSubmit={submitHandler} className={classes.form}>
          <h1 className={classes.contactMe}>{texts[lang].contactMe}</h1>
          <div className={classes.equal}>
            <div className={classes.labelInput}>
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
            </div>
            <div className={classes.labelInput}>
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
            </div>
          </div>
          <div className={classes.labelInput}>
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
          </div>
          <div className={classes.equal}>
            <div className={classes.labelInput}>
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
            </div>
            <div className={classes.labelInput}>
              <label>{texts[lang].labels[4]}</label>
              <div
                onClick={(event) => event.stopPropagation()}
                className={`${classes.selectContainer} ${subjectTouched && currentErrors.subject ? classes.error : ""} ${isShaking && currentErrors.subject ? classes.shake : ""}`}
              >
                <div
                  onClick={() => {
                    setIsOpenDropdown((prev) => !prev);
                    setSubjectTouched(true);
                  }}
                  className={classes.selectArrowContainer}
                >
                  <h2 className={classes.pleaseSelect}>
                    {selected === "" ? `${texts[lang].selects[6]}` : selected}
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
                {isOpenDropdown && (
                  <div className={classes.optionsContainer}>
                    <ul>
                      <li
                        onClick={() => {
                          setSelected("General Question");
                          setIsOpenDropdown(false);
                        }}
                      >
                        {texts[lang].selects[0]}
                      </li>
                      <li
                        onClick={() => {
                          setSelected("Technical Question");
                          setIsOpenDropdown(false);
                        }}
                      >
                        {texts[lang].selects[1]}
                      </li>
                      <li
                        onClick={() => {
                          setSelected("Job Opportunity");
                          setIsOpenDropdown(false);
                        }}
                      >
                        {texts[lang].selects[2]}
                      </li>
                      <li
                        onClick={() => {
                          (setSelected("Internship Offer"),
                            setIsOpenDropdown(false));
                        }}
                      >
                        {texts[lang].selects[3]}
                      </li>
                      <li
                        onClick={() => {
                          (setSelected("Freelance Work"),
                            setIsOpenDropdown(false));
                        }}
                      >
                        {texts[lang].selects[4]}
                      </li>
                      <li
                        onClick={() => {
                          (setSelected("Feedback"), setIsOpenDropdown(false));
                        }}
                      >
                        {texts[lang].selects[5]}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={classes.labelInput}>
            <label htmlFor="text">{texts[lang].labels[5]}</label>
            <textarea
              name="text"
              id="text"
              className={`${input.text.isBlur && currentErrors.text ? classes.error : ""} ${isShaking && currentErrors.text ? classes.shake : ""}`}
              onFocus={focusHandler}
              onChange={changeHandler}
              onBlur={blurHandler}
              value={input.text.letters}
            ></textarea>
          </div>
          <Button disabled={isPending}>
            {isPending ? texts[lang].button[0] : texts[lang].button[1]}
          </Button>
        </form>
      </div>
    </>
  );
}
