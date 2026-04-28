"use client";

import { useMemo, useState } from "react";
import classes from "./Contact.module.css";
import Button from "../components/Button";
import Input from "../components/Input";
import { Phone, Mail, MapPin, ArrowDown } from "lucide-react";
import { usePostMessage } from "../../hooks/usePostMessage";
import { useRouter } from "next/navigation";

export default function Home() {
  const { mutate, isPending, isError, error } = usePostMessage();
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
    phoneNumber: {
      letters: "",
      isBlur: false,
    },
    text: {
      letters: "",
      isBlur: false,
    },
  });

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selected, setSelected] = useState("");
  const [isShaking, setIsShaking] = useState(false);

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
      <main className={classes.main} onClick={() => setIsOpenDropdown(false)}>
        <div className={classes.contactContainer}>
          <div className={classes.contactText}>
            <h1>Drop me a message</h1>
            <p>
              I’m currently looking for internship opportunities as a software
              developer, along with freelance or collaboration projects. If you
              have any questions, project ideas, or opportunities, feel free to
              send a message. I’ll respond as soon as possible.
            </p>
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
          <h1 className={classes.contactMe}>Contact Me</h1>
          <div className={classes.equal}>
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
          <div className={classes.equal}>
            <div className={classes.labelInput}>
              <label htmlFor="phoneNumber">Phone Number</label>
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
              <label>Subject</label>
              <div
                onClick={(event) => event.stopPropagation()}
                className={`${classes.selectContainer} ${currentErrors.subject ? classes.error : ""} ${isShaking && currentErrors.subject ? classes.shake : ""}`}
              >
                <div
                  onClick={() => setIsOpenDropdown((prev) => !prev)}
                  className={classes.selectArrowContainer}
                >
                  <h2 className={classes.pleaseSelect}>
                    {selected === "" ? "Please Select" : selected}
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
                        General Question
                      </li>
                      <li
                        onClick={() => {
                          setSelected("Technical Question");
                          setIsOpenDropdown(false);
                        }}
                      >
                        Technical Question
                      </li>
                      <li
                        onClick={() => {
                          setSelected("Job Opportunity");
                          setIsOpenDropdown(false);
                        }}
                      >
                        Job Opportunity
                      </li>
                      <li
                        onClick={() => {
                          (setSelected("Internship Offer"),
                            setIsOpenDropdown(false));
                        }}
                      >
                        Internship Offer
                      </li>
                      <li
                        onClick={() => {
                          (setSelected("Freelance Work"),
                            setIsOpenDropdown(false));
                        }}
                      >
                        Freelance Work
                      </li>
                      <li
                        onClick={() => {
                          (setSelected("Feedback"), setIsOpenDropdown(false));
                        }}
                      >
                        Feedback
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={classes.labelInput}>
            <label htmlFor="text">Message</label>
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
            {isPending ? "Loading..." : "Send"}
          </Button>
        </form>
      </main>
    </>
  );
}
