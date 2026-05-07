"use client";

import { useState } from "react";
import classes from "./Contact.module.css";
import AddContactForm from "../components/AddContactForm/AddContactForm";

export default function Home() {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  return (
    <div className={classes.div} onClick={() => setIsOpenDropdown(false)}>
      <AddContactForm />
    </div>
  );
}
