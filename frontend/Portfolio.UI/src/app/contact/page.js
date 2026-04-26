"use client";

import { useMemo, useState } from "react";
import classes from "./Contact.module.css";
import Button from "../components/Button";
import Input from "../components/Input";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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
    message: {
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
    if (!input.message.letters.trim()) errors.message = "Message is required";
    return errors;
  }

  const currentErrors = useMemo(() => validate(input), [input]);

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
    setState({ loading: false, error: null });
    const errors = validate(input);
    if (Object.keys(currentErrors).length > 0) {
      setInput((prev) => ({
        ...prev,
        name: { ...prev.name, isBlur: true },
        surname: { ...prev.surname, isBlur: true },
        email: { ...prev.email, isBlur: true },
        message: { ...prev.message, isBlur: true },
      }));
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }
    try {
      setState((prev) => ({ ...prev, loading: true }));
      const response = await fetch("https://localhost:7178/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: input.name.letters,
          surname: input.surname.letters,
          email: input.email.letters,
          message: input.message.letters,
        }),
      });
      const result = await response.json();
      if (response.status >= 500) {
        router.replace("/error");
        return;
      }
      if (!response.ok) {
        const errorMessage =
          result.detail ||
          result.title ||
          (result.errors && Object.values(result.errors).flat().join(","));
        setState((prev) => ({ ...prev, error: errorMessage }));
        return;
      }
      setInput({
        name: { letters: "", isBlur: false },
        surname: { letters: "", isBlur: false },
        email: { letters: "", isBlur: false },
        message: { letters: "", isBlur: false },
      });
      console.log(result);
    } catch (err) {
      setState((prev) => ({ ...prev, error: err.message }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }

  return (
    <>
      {state.loading && <p>Loading...</p>}
      {state.error && <p className={classes.backendError}>{state.error}</p>}
      <main className={classes.main}>
        <form onSubmit={submitHandler} className={classes.form}>
          <h1 className={classes.contactMe}>Contact Me</h1>
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
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              className={`${input.message.isBlur && currentErrors.message ? classes.error : ""} ${isShaking && currentErrors.message ? classes.shake : ""}`}
              onFocus={focusHandler}
              onChange={changeHandler}
              onBlur={blurHandler}
              value={input.message.letters}
            ></textarea>
          </div>
          <Button type="submit" text="Send" />
        </form>
      </main>
    </>
  );
}
