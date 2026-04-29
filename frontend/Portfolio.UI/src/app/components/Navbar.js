"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classes from "./Navbar.module.css";
import { useContext, useEffect, useState } from "react";
import Button from "./Button";
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
import { useGetMessages } from "../../hooks/useGetMessages";
import { usePostLogout } from "../../hooks/usePostLogout";
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
        { path: "/dashboard", text: "Kontrol Paneli" },
        { path: "/messages", text: "Mesajlar" },
        { path: "/works", text: "Çalışmalar" },
        { path: "/projects", text: "Projeler" },
        { path: "/settings", text: "Ayarlar" },
        { path: "/status", text: "Durum" },
      ],
      logOut: "Çıkış Yap",
    },
    en: {
      links: [
        { path: "/dashboard", text: "Dashboard" },
        { path: "/messages", text: "Messages" },
        { path: "/works", text: "Works" },
        { path: "/projects", text: "Projects" },
        { path: "/settings", text: "Settings" },
        { path: "/status", text: "Status" },
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
        {isAuth && pathName !== "/dashboard" && (
          <Link
            href="/dashboard"
            className={
              pathName === "/dashboard" ? classes.active : classes.link
            }
            title="Dashboard"
          >
            <LayoutDashboard size={40} stroke="url(#gold-stroke)" />
          </Link>
        )}
        {isAuth && pathName !== "/messages" && (
          <Link
            href="/messages"
            className={pathName === "/messages" ? classes.active : classes.link}
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
          href="/projects"
          className={pathName === "/projects" ? classes.hidden : classes.link}
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
