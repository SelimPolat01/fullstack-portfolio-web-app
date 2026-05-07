"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classes from "./Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import {
  LogIn,
  LogOut,
  Home,
  Code2,
  Mail,
  UserPlus,
  BookOpen,
  MessageSquareText,
  Menu,
  LayoutDashboard,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useGetMessages } from "../../../hooks/GET/useGetMessages";
import { usePostLogout } from "../../../hooks/POST/usePostLogout";
import { LangContext } from "@/contexts/LangContext";

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const { data, isLoading, isError, error } = useGetMessages(token);
  const { mutate, isPending, isMutationError, mutationError } =
    usePostLogout(token);
  const { lang, toggleLang } = useContext(LangContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    setIsAuth(!!token);
  }, [pathName]);
  const texts = {
    tr: {
      links: [
        { path: "/admin/dashboard", text: "Kontrol Paneli" },
        { path: "/admin/messages", text: "Mesajlar" },
        { path: "/admin/projects", text: "Projeler" },
        { path: "/admin/works", text: "Çalışmalar" },
        { path: "/admin/settings", text: "Ayarlar" },
        { path: "/admin/status", text: "Durum" },
      ],
      logOut: "Çıkış Yap",
    },
    en: {
      links: [
        { path: "/admin/dashboard", text: "Dashboard" },
        { path: "/admin/messages", text: "Messages" },
        { path: "/admin/projects", text: "Projects" },
        { path: "/admin/works", text: "Works" },
        { path: "/admin/settings", text: "Settings" },
        { path: "/admin/status", text: "Status" },
      ],
      logOut: "Logout",
    },
  };

  async function logoutHandler() {
    const token = localStorage.getItem("token");
    mutate(
      { token },
      {
        onSuccess: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          setIsAuth(false);
          router.replace("/admin/login");
        },
        onError: (err) => console.error(err),
      },
    );
  }

  return (
    <nav className={classes.nav}>
      <div className={classes.firstFlex}>
        {isAuth && (
          <div className={classes.menuWrapper}>
            <Menu size={40} />
            <ul className={classes.menuPanel}>
              {texts[lang].links.map((link) => (
                <li key={link.path} className={classes.menuList}>
                  <Link
                    className={classes.menuLink}
                    href={link.path}
                    title={link.text}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}

              <li className={classes.menuList}>
                <Button
                  type="button"
                  onClick={logoutHandler}
                  cancelButton
                  title="Logout"
                >
                  <span className={classes.logoutText}>
                    {texts[lang].logOut}
                  </span>
                </Button>
              </li>
            </ul>
          </div>
        )}
        {isAuth && pathName !== "/admin/dashboard" && (
          <Link
            href="/admin/dashboard"
            className={
              pathName === "/admin/dashboard" ? classes.active : classes.link
            }
            title="Dashboard"
          >
            <LayoutDashboard size={40} stroke="url(#gold-stroke)" />
          </Link>
        )}
        {isAuth && pathName !== "/admin/messages" && (
          <Link
            href="/admin/messages"
            className={
              pathName === "/admin/messages" ? classes.active : classes.link
            }
            title="Messages"
          >
            <MessageSquareText size={40} stroke="url(#gold-stroke)" />
            <span className={classes.unreadLength}>
              {data?.result?.filter((message) => !message.isRead).length}
            </span>
          </Link>
        )}
        <Link
          href="/"
          className={pathName === "/" ? classes.hidden : classes.link}
          title="Home"
        >
          <Home size={40} stroke="url(#gold-stroke)" />
        </Link>
      </div>
      <div className={classes.lastFlex}>
        <Link
          href="/admin/projects"
          className={
            pathName === "/admin/projects" ? classes.hidden : classes.link
          }
          title="Projects"
        >
          <Code2 size={40} stroke="url(#gold-stroke)" />
        </Link>
        <Link
          href="/about"
          className={pathName === "/about" ? classes.hidden : classes.link}
          title="About"
        >
          <BookOpen size={40} stroke="url(#gold-stroke)" />
        </Link>
        <Link
          href="/contact"
          className={pathName === "/contact" ? classes.hidden : classes.link}
          title="Contact"
        >
          <Mail size={40} stroke="url(#gold-stroke)" />
        </Link>
        {!isAuth && (
          <Link
            href="/admin/register"
            className={
              pathName === "/admin/register" ? classes.hidden : classes.link
            }
            title="Register"
          >
            <UserPlus size={40} stroke="url(#gold-stroke)" />
          </Link>
        )}
        {!isAuth && (
          <Link
            href="/admin/login"
            className={
              pathName === "/admin/login" ? classes.hidden : classes.link
            }
            title="Login"
          >
            <LogIn size={40} stroke="url(#gold-stroke)" />
          </Link>
        )}
        {isAuth && (
          <Button
            type="button"
            onClick={logoutHandler}
            cancelButton
            title="Logout"
          >
            <LogOut size={40} stroke="url(#gold-stroke)" />
          </Button>
        )}
        <Button
          type="button"
          cancelButton
          onClick={toggleLang}
          title={lang === "en" ? "Switch to Turkish" : "İngilizce'ye Geç"}
        >
          {lang === "en" ? (
            <ToggleRight size={40} stroke="url(#gold-stroke)" />
          ) : (
            <ToggleLeft size={40} stroke="url(#gold-stroke)" />
          )}
        </Button>
      </div>
    </nav>
  );
}
