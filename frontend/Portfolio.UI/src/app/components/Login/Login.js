"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import Input from "../Input/Input";
import classes from "./Login.module.css";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { usePostLogin } from "@/hooks/POST/usePostLogin";
import { LangContext } from "@/contexts/LangContext";
import { motion } from "framer-motion";
import {
  formElementVariants,
  formVariants,
  textVariants,
} from "@/lib/variants";

export default function Login() {
  const router = useRouter();
  const [isShaking, setIsShaking] = useState(false);
  const [token, setToken] = useState(null);
  const { mutate, isPending, isError, error } = usePostLogin();
  const { lang, toggleLang } = useContext(LangContext);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (token) router.replace("/");
  }, [router]);

  const [input, setInput] = useState({
    email: {
      letters: "",
      isBlur: false,
    },
    password: {
      letters: "",
      isBlur: false,
    },
  });
  const texts = {
    tr: {
      h1: "Giriş Yap",
      labels: ["Eposta", "Şifre"],
      button: ["Yükleniyor...", "Giriş"],
    },
    en: {
      h1: "Login",
      labels: ["Email", "Password"],
      button: ["Loading...", "Login"],
    },
  };

  function validate(input) {
    const errors = {};
    const email = input.email.letters.trim();
    const password = input.password.letters;
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Email format is invalid.";
    }
    if (!password.trim()) {
      errors.password = "Password is required.";
    } else if (password.length < 5) {
      errors.password = "Password must be at least 5 characters.";
    }
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
    const errors = validate(input);
    if (Object.keys(errors).length > 0) {
      setInput((prev) => ({
        ...prev,
        email: { ...prev.email, isBlur: true },
        password: { ...prev.password, isBlur: true },
      }));
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }
    mutate(
      {
        body: {
          email: input.email.letters,
          password: input.password.letters,
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
            email: {
              letters: "",
              isBlur: false,
            },
            password: {
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
        <motion.h1 variants={textVariants} className={classes.login}>
          {texts[lang].h1}
        </motion.h1>
        <motion.div
          variants={formElementVariants}
          className={classes.labelInput}
        >
          <label htmlFor="email">{texts[lang].labels[0]}</label>
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
        <motion.div
          variants={formElementVariants}
          className={classes.labelInput}
        >
          <label htmlFor="password">{texts[lang].labels[1]}</label>
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
        <motion.div variants={formElementVariants}>
          <Button disabled={isPending} whileTap={{ scale: 0.95 }}>
            {isPending ? texts[lang].button[0] : texts[lang].button[1]}
          </Button>
        </motion.div>
      </motion.form>
    </div>
  );
}
