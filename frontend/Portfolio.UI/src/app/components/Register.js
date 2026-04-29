"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import Input from "./Input";
import classes from "./Register.module.css";
import Button from "./Button";
import { useRouter } from "next/navigation";
import ErrorMessage from "./ErrorMessage";
import { usePostRegister } from "../../hooks/usePostRegister";
import { LangContext } from "@/contexts/LangContext";

export default function Register() {
  const router = useRouter();
  const { mutate, isPending, isError, error } = usePostRegister();
  const [isShaking, setIsShaking] = useState(false);
  const { lang, toggleLang } = useContext(LangContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    }
  }, [router]);
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
    password: {
      letters: "",
      isBlur: false,
    },
    confirmPassword: {
      letters: "",
      isBlur: false,
    },
  });
  const texts = {
    tr: {
      h1: ["Kayıt Ol"],
      labels: [
        "İsim",
        "Soyisim",
        "Eposta",
        "Telefon Numarası",
        "Şifre",
        "Şifreyi Onayla",
      ],
      button: ["Yükleniyor...", "Kayıt Ol"],
    },
    en: {
      h1: ["Register"],
      labels: [
        "Name",
        "Surname",
        "Email",
        "Phone Number",
        "Password",
        "Confirm Password",
      ],
      button: ["Loading...", "Register"],
    },
  };

  function validate(input) {
    const errors = {};
    if (!input.name.letters.trim()) errors.name = "Name is required";
    if (!input.surname.letters.trim()) errors.surname = "Surname is required";
    if (
      !input.email.letters.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.letters)
    )
      errors.email = "Email is invalid format.";
    if (!/^\+90\d{10}$/.test(input.phoneNumber.letters))
      errors.phoneNumber = "Phone number is invalid format.";
    if (!input.password.letters.trim() || input.password.letters.length < 5)
      errors.password = "Password is invalid format.";
    if (!input.confirmPassword.letters.trim())
      errors.confirmPassword = "Confirm password is required.";
    else if (input.password.letters !== input.confirmPassword.letters)
      errors.confirmPassword = "Passwords do not match.";
    return errors;
  }

  const currentErrors = useMemo(() => validate(input), [input]);

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

  async function submitHandler(event) {
    event.preventDefault();
    if (Object.keys(currentErrors).length > 0) {
      setInput((prev) => ({
        ...prev,
        name: { ...prev.name, isBlur: true },
        surname: { ...prev.surname, isBlur: true },
        email: { ...prev.email, isBlur: true },
        phoneNumber: { ...prev.phoneNumber, isBlur: true },
        password: { ...prev.password, isBlur: true },
        confirmPassword: { ...prev.confirmPassword, isBlur: true },
      }));
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
          password: input.password.letters,
          confirmPassword: input.confirmPassword.letters,
        },
      },
      {
        onSuccess: (data) => {
          const token = data?.result?.token;
          const refreshToken = data?.result?.refreshToken;
          localStorage.setItem("token", token);
          localStorage.setItem("refreshToken", refreshToken);
          router.replace("/");
          setInput({
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
            password: {
              letters: "",
              isBlur: false,
            },
            confirmPassword: {
              letters: "",
              isBlur: false,
            },
          });
        },
        onError: (err) => {
          console.log(err);
          router.replace("/error");
          return;
        },
      },
    );
  }

  return (
    <div className={classes.div}>
      {isError && <ErrorMessage message={error?.message} />}
      <form className={classes.form} onSubmit={submitHandler}>
        <h1 className={classes.register}>{texts[lang].h1}</h1>
        <div className={classes.fullName}>
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
        <div className={classes.labelInput}>
          <label htmlFor="phoneNumber">{texts[lang].labels[3]}</label>
          <Input
            type="tel"
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
          <label htmlFor="password">{texts[lang].labels[4]}</label>
          <Input
            type="password"
            name="password"
            className={`${input.password.isBlur && currentErrors.password ? classes.error : ""} ${isShaking && currentErrors.password ? classes.shake : ""}`}
            onFocus={focusHandler}
            onChange={changeHandler}
            onBlur={blurHandler}
            value={input.password.letters}
          />
        </div>
        <div className={classes.labelInput}>
          <label htmlFor="confirmPassword">{texts[lang].labels[5]}</label>
          <Input
            type="password"
            name="confirmPassword"
            className={`${input.confirmPassword.isBlur && currentErrors.confirmPassword ? classes.error : ""} ${isShaking && currentErrors.confirmPassword ? classes.shake : ""}`}
            onFocus={focusHandler}
            onChange={changeHandler}
            onBlur={blurHandler}
            value={input.confirmPassword.letters}
          />
        </div>
        <Button disabled={isPending}>
          {isPending ? texts[lang].button[0] : texts[lang].button[1]}
        </Button>
      </form>
    </div>
  );
}
