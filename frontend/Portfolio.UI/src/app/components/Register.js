"use client";

import { useEffect, useMemo, useState } from "react";
import Input from "./Input";
import classes from "./Register.module.css";
import Button from "./Button";
import { useRouter } from "next/navigation";
import ErrorMessage from "./ErrorMessage";

export default function Register() {
  const router = useRouter();

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
    phone: {
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

  const [state, setState] = useState({
    loading: false,
    error: null,
  });

  const [isShaking, setIsShaking] = useState(false);

  function validate(input) {
    const errors = {};
    if (!input.name.letters.trim()) errors.name = "Name is required";
    if (!input.surname.letters.trim()) errors.surname = "Surname is required";
    if (!input.email.letters.trim()) errors.email = "Email is required";
    if (!input.phone.letters.trim()) errors.phone = "Phone is required";
    if (!input.password.letters.trim())
      errors.password = "Password is required";
    if (!input.confirmPassword.letters.trim())
      errors.confirmPassword = "Confirm password is required";
    else if (input.password.letters !== input.confirmPassword.letters)
      errors.confirmPassword = "Passwords do not match";
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
        name: { ...prev.name, isBlur: true },
        surname: { ...prev.surname, isBlur: true },
        email: { ...prev.email, isBlur: true },
        phone: { ...prev.phone, isBlur: true },
        password: { ...prev.password, isBlur: true },
        confirmPassword: { ...prev.confirmPassword, isBlur: true },
      }));
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await fetch(
        "https://localhost:7178/api/admin/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: input.name.letters,
            surname: input.surname.letters,
            email: input.email.letters,
            phone: input.phone.letters,
            password: input.password.letters,
            confirmPassword: input.confirmPassword.letters,
          }),
        },
      );
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
        phone: {
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
        <h1 className={classes.register}>Register</h1>
        <div className={classes.fullName}>
          <div className={classes.labelInput}>
            <label htmlFor="name">Name</label>
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
            <label htmlFor="surname">Surname</label>
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
          <label htmlFor="phone">Phone Number</label>
          <Input
            type="tel"
            name="phone"
            className={`${input.phone.isBlur && currentErrors.phone ? classes.error : ""} ${isShaking && currentErrors.phone ? classes.shake : ""}`}
            onFocus={focusHandler}
            onChange={changeHandler}
            onBlur={blurHandler}
            value={input.phone.letters}
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
        <div className={classes.labelInput}>
          <label htmlFor="confirmPassword">Confirm Password</label>
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
        <Button
          type="submit"
          text={state.loading ? "Loading..." : "Register"}
          disabled={state.loading}
        />
      </form>
    </div>
  );
}
