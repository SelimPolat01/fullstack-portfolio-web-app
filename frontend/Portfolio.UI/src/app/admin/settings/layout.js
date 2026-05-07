"use client";

import Link from "next/link";
import classes from "./SettingsLayout.module.css";
import { useContext, useEffect, useState } from "react";
import { LangContext } from "@/contexts/LangContext";
import { User, Settings, Shield, Bell, Moon, LogOut, Sun } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Button from "@/app/components/Button/Button";
import { usePostLogout } from "@/hooks/POST/usePostLogout";
import { useTheme } from "next-themes";

export default function SettingsLayout({ children }) {
  const pathName = usePathname();
  const router = useRouter();
  const [token, setToken] = useState(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentToken = localStorage.getItem("token");
    if (currentToken) {
      setToken(currentToken);
    }
  }, []);

  const { lang } = useContext(LangContext);
  const { mutate, isPending, isMutationError, mutationError } =
    usePostLogout(token);

  const texts = {
    tr: {
      linkTexts: [
        "Kişisel Bilgiler",
        "Sayfa Ayarları",
        "Güvenlik",
        "Bildirimler",
      ],
    },
    en: {
      linkTexts: [
        "Personal Info",
        "Page Settings",
        "Security",
        "Notifications",
      ],
    },
  };

  const icons = [User, Settings, Shield, Bell];
  const base = "/admin/settings";
  const links = [
    { href: `${base}/personal-info`, text: texts[lang].linkTexts[0] },
    { href: `${base}/page-settings`, text: texts[lang].linkTexts[1] },
    { href: `${base}/security`, text: texts[lang].linkTexts[2] },
    { href: `${base}/notifications`, text: texts[lang].linkTexts[3] },
  ];

  async function logoutHandler() {
    mutate(
      { token: token },
      {
        onSuccess: () => {
          router.replace("/admin/login");
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
        },
        onError: (err) => console.error(err),
      },
    );
  }

  if (!mounted) return null;

  return (
    <div className={classes.wrapper}>
      <div className={classes.linkDiv}>
        <div className={classes.linkContainer}>
          <ul className={classes.linkMenu}>
            {links.map((link, index) => {
              const Icon = icons[index];
              return (
                <li
                  className={`${classes.list} ${pathName.startsWith(link.href) ? classes.active : ""}`}
                  key={index}
                >
                  <Icon />
                  <Link className={classes.link} href={link.href}>
                    {link.text}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={classes.darkModeLogoutContainer}>
            <ul className={classes.linkMenu}>
              <li className={classes.list}>
                <Button
                  cancelButton
                  type="button"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun /> : <Moon />}
                  <span>Dark Mode</span>
                </Button>
              </li>
              <li className={classes.list}>
                <Button onClick={logoutHandler} cancelButton type="button">
                  <LogOut />
                  <span>Logout</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={classes.mainContent}>{children}</div>
    </div>
  );
}
