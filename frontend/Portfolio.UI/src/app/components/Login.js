"use client";

import { useEffect, useMemo, useState } from "react";
import Input from "./Input";
import classes from "./Login.module.css";
import Button from "./Button";
import { useRouter } from "next/navigation";
import ErrorMessage from "./ErrorMessage";

export default function Login() {
  const router = useRouter();

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

  const [state, setState] = useState({
    loading: false,
    error: null,
  });

  const [isShaking, setIsShaking] = useState(false);

  function validate(input) {
    const errors = {};
    if (!input.email.letters.trim()) errors.email = "Email is required";
    if (!input.password.letters.trim())
      errors.password = "Password is required";
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
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await fetch("https://localhost:7178/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: input.email.letters,
          password: input.password.letters,
        }),
      });
      const result = await response.json();
      if (response.status >= 500) {
        router.replace("/error");
        return;
      }
      if (!response.ok) {
        const errorMessage =
          (result.errors && Object.values(result.errors).flat().join(" | ")) ||
          result.message ||
          result.Message ||
          result.title;
        setState((prev) => ({ ...prev, error: errorMessage }));
        return;
      }
      const token = result.token || result.Token;
      const refreshToken = result.refreshToken || result.RefreshToken;
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
    } catch (err) {
      setState((prev) => ({ ...prev, error: err.message }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }

  return (
    <div className={classes.div}>
      {state.error && <ErrorMessage message={state.error} />}
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
        <Button
          type="submit"
          text={state.loading ? "Loading..." : "Login"}
          disabled={state.loading}
        />
      </form>
    </div>
  );
}
