"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classes from "./Navbar.module.css";
import { useEffect, useState } from "react";
import Button from "./Button";

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, [pathName]);

  async function logoutHandler() {
    const token = localStorage.getItem("token");
    try {
      await fetch("https://localhost:7178/api/admin/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      setIsAuth(false);
      router.replace("/admin/login");
    }
  }

  return (
    <nav className={classes.nav}>
      <div className={classes.flex}>
        <Link
          href="/"
          className={pathName === "/" ? classes.active : classes.link}
        >
          HOME
        </Link>
        <Link
          href="/projects"
          className={pathName === "/projects" ? classes.active : classes.link}
        >
          PROJECTS
        </Link>
      </div>
      <div className={classes.flex}>
        <Link
          href="/about"
          className={pathName === "/about" ? classes.active : classes.link}
        >
          ABOUT
        </Link>
        <Link
          href="/contact"
          className={pathName === "/contact" ? classes.active : classes.link}
        >
          CONTACT
        </Link>
        {!isAuth && (
          <Link
            href="/admin/register"
            className={
              pathName === "/admin/register" ? classes.active : classes.link
            }
          >
            REGISTER
          </Link>
        )}
        {!isAuth && (
          <Link
            href="/admin/login"
            className={
              pathName === "/admin/login" ? classes.active : classes.link
            }
          >
            LOGIN
          </Link>
        )}
        {isAuth && (
          <Button
            type="button"
            text="LOGOUT"
            onClick={logoutHandler}
            cancelButton
          />
        )}
      </div>
    </nav>
  );
}
