"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import classes from "./Navbar.module.css";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { usePostLogout } from "../../hooks/usePostLogout";

export default function Navbar() {
  const router = useRouter();
  const pathName = usePathname();
  const [isAuth, setIsAuth] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [token, setToken] = useState(null);
  const { data, isLoading, isError, error } = useGetMessages(token);
  const { mutate, isPending, isMutationError, mutationError } =
    usePostLogout(token);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    setIsAuth(!!token);
  }, [pathName]);

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

  const links = [
    { path: "/dashboard", text: "Dashboard" },
    { path: "/messages", text: "Messages" },
    { path: "/works", text: "Works" },
    { path: "/projects", text: "Projects" },
    { path: "/settings", text: "Settings" },
    { path: "/status", text: "Status" },
  ];

  if (isLoading && isAuth) {
    return <span>Loading...</span>;
  }

  return (
    <nav className={classes.nav}>
      <div className={classes.firstFlex}>
        {isAuth && (
          <div className={classes.menuWrapper}>
            <Menu size={40} />
            <ul className={classes.menuPanel}>
              {links.map((link, index) => (
                <li key={index} className={classes.menuList}>
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
                  text="LOGOUT"
                  onClick={logoutHandler}
                  cancelButton
                  title="Logout"
                >
                  <span className={classes.logoutText}>Logout</span>
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
            <LayoutDashboard size={40} stroke="url(#magic-gradient)" />
          </Link>
        )}
        {isAuth && pathName !== "/messages" && (
          <Link
            href="/messages"
            className={pathName === "/messages" ? classes.active : classes.link}
            title="Messages"
          >
            <MessageSquareText size={40} stroke="url(#magic-gradient)" />
            <span>{data?.result?.length}</span>
          </Link>
        )}
        <Link
          href="/"
          className={pathName === "/" ? classes.hidden : classes.link}
          title="Home"
        >
          <Home size={40} stroke="url(#magic-gradient)" />
        </Link>
      </div>
      <div className={classes.lastFlex}>
        <Link
          href="/projects"
          className={pathName === "/projects" ? classes.hidden : classes.link}
          title="Projects"
        >
          <Code2 size={40} stroke="url(#magic-gradient)" />
        </Link>
        <Link
          href="/about"
          className={pathName === "/about" ? classes.hidden : classes.link}
          title="About"
        >
          <BookOpen size={40} stroke="url(#magic-gradient)" />
        </Link>
        <Link
          href="/contact"
          className={pathName === "/contact" ? classes.hidden : classes.link}
          title="Contact"
        >
          <Mail size={40} stroke="url(#magic-gradient)" />
        </Link>
        {!isAuth && (
          <Link
            href="/admin/register"
            className={
              pathName === "/admin/register" ? classes.hidden : classes.link
            }
            title="Register"
          >
            <UserPlus size={40} stroke="url(#magic-gradient)" />
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
            <LogIn size={40} stroke="url(#magic-gradient)" />
          </Link>
        )}
        {isAuth && (
          <Button
            type="button"
            text="LOGOUT"
            onClick={logoutHandler}
            cancelButton
            title="Logout"
          >
            <LogOut size={40} stroke="url(#magic-gradient)" />
          </Button>
        )}
      </div>
    </nav>
  );
}
