"use client";

import { useEffect, useMemo, useState } from "react";
import Input from "./Input";
import classes from "./Login.module.css";
import Button from "./Button";
import { useRouter } from "next/navigation";
import ErrorMessage from "./ErrorMessage";
import { usePostLogin } from "../../hooks/usePostLogin";

export default function Login() {
  const router = useRouter();
  const [isShaking, setIsShaking] = useState(false);
  const { mutate, isPending, isError, error } = usePostLogin();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    }
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

  function validate(input) {
    const errors = {};
    if (
      !input.email.letters.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.letters)
    )
      errors.email = "Email is invalid format";
    if (!input.password.letters.trim() || input.password.letters.length < 5)
      errors.password = "Password is invalid format.";
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
        <h1 className={classes.login}>Login</h1>
        <div className={classes.labelInput}>
          <label htmlFor="email">Email</label>
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
          <label htmlFor="password">Password</label>
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
        <Button disabled={isPending}>
          {isPending ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
