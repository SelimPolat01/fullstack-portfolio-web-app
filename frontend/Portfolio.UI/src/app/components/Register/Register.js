"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import Input from "../Input/Input";
import classes from "./Register.module.css";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { usePostRegister } from "@/hooks/POST/usePostRegister";
import { LangContext } from "@/contexts/LangContext";
import { motion } from "framer-motion";
import { formElementVariants, formVariants } from "@/lib/variants";
import { useGetEmailConflict } from "@/hooks/GET/useGetEmailConflict";

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

  function validate(input) {
    const errors = {};

    const name = input.name.letters.trim();
    const surname = input.surname.letters.trim();
    const email = input.email.letters.trim();
    const phone = input.phoneNumber.letters.trim();
    const password = input.password.letters;
    const confirmPassword = input.confirmPassword.letters;

    if (!name) errors.name = "Name is required.";
    if (!surname) errors.surname = "Surname is required.";
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email format is invalid.";
    }
    if (!phone) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!/^\+90\d{10}$/.test(phone)) {
      errors.phoneNumber = "Phone number must be in +90XXXXXXXXXX format.";
    }
    if (!password.trim()) {
      errors.password = "Password is required.";
    } else if (password.length < 5) {
      errors.password = "Password must be at least 5 characters.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one digit.";
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.password = "Password must contain at least one special character.";
    }
    if (!confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  }

  const currentErrors = useMemo(() => validate(input), [input]);

  const {
    data: getEmailConflictData,
    isLoading: getEmailConflictIsLoading,
    isError: getEmailConflictIsError,
    error: getEmailConflictError,
  } = useGetEmailConflict(
    input.email.letters,
    input.email.isBlur,
    !currentErrors.email,
  );

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
    if (
      Object.keys(currentErrors).length > 0 ||
      getEmailConflictData?.result?.isAvailable === false
    ) {
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
        },
      },
    );
  }

  return (
    <div className={classes.div}>
      {isError && <ErrorMessage message={error?.message} />}
      <motion.form
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className={classes.form}
        onSubmit={submitHandler}
      >
        <motion.h1 variants={formElementVariants} className={classes.register}>
          {texts[lang].h1}
        </motion.h1>
        <div className={classes.fullName}>
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
            type="text"
            name="email"
            className={`${
              input.email.isBlur &&
              (currentErrors.email ||
                getEmailConflictData?.result?.isAvailable === false)
                ? classes.error
                : ""
            } ${
              isShaking &&
              input.email.isBlur &&
              (currentErrors.email ||
                getEmailConflictData?.result?.isAvailable === false)
                ? classes.shake
                : ""
            }`}
            onFocus={focusHandler}
            onChange={changeHandler}
            onBlur={blurHandler}
            value={input.email.letters}
          />
          {input.email.isBlur && currentErrors.email && (
            <span className="errorSpan">{currentErrors.email}</span>
          )}
          {getEmailConflictData?.result?.isAvailable === false &&
            !getEmailConflictIsLoading &&
            input.email.isBlur && (
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  margin: "4px 0 0 0",
                  display: "block",
                }}
              >
                {getEmailConflictData?.result?.message}
              </span>
            )}
        </motion.div>
        <motion.div
          variants={formElementVariants}
          className={classes.labelInput}
        >
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
          {input.phoneNumber.isBlur && currentErrors.phoneNumber && (
            <span className="errorSpan">{currentErrors.phoneNumber}</span>
          )}
        </motion.div>
        <motion.div
          variants={formElementVariants}
          className={classes.labelInput}
        >
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
          {input.password.isBlur && currentErrors.password && (
            <span className="errorSpan">{currentErrors.password}</span>
          )}
        </motion.div>
        <motion.div
          variants={formElementVariants}
          className={classes.labelInput}
        >
          <label htmlFor="confirmPassword">{texts[lang].labels[5]}</label>
          <Input
            type="password"
            name="confirmPassword"
            className={`${input.confirmPassword.isBlur && currentErrors.confirmPassword ? classes.error : ""} ${isShaking && currentErrors.confirmPassword ? classes.shake : ""}`}
            onFocus={focusHandler}
            onChange={changeHandler}
            onBlur={blurHandler}
            value={input.confirmPassword.letters}
          />{" "}
          {input.confirmPassword.isBlur && currentErrors.confirmPassword && (
            <span className="errorSpan">{currentErrors.confirmPassword}</span>
          )}
        </motion.div>
        <motion.div variants={formElementVariants}>
          <Button disabled={isPending} whileTap={{ scale: 0.95 }}>
            {isPending || getEmailConflictIsLoading
              ? texts[lang].button[0]
              : texts[lang].button[1]}
          </Button>
        </motion.div>
      </motion.form>
    </div>
  );
}
