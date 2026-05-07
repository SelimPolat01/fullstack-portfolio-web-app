import "./globals.css";
import ReactQuery from "../lib/reactQuery";
import ConditionalNavbar from "./components/ConditionalNavbar/ConditionalNavbar";
import { LangProvider } from "@/contexts/LangContext";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "Home",
  description: "Portfolio Site",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            <ReactQuery>
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  <linearGradient
                    id="magic-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#00c6ff" />
                    <stop offset="50%" stopColor="#833ab4" />
                    <stop offset="100%" stopColor="#ff007f" />
                  </linearGradient>
                </defs>
              </svg>
              <svg width="0" height="0" style={{ position: "absolute" }}>
                <defs>
                  <linearGradient
                    id="gold-stroke"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#F9D423" />
                    <stop offset="50%" stopColor="#FF4E50" />
                    <stop offset="100%" stopColor="#C33764" />
                  </linearGradient>
                </defs>
              </svg>
              <svg width="0%" height="0%" style={{ position: "absolute" }}>
                <defs>
                  <linearGradient
                    id="unread-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="50%" stopColor="#D8DFE8" />
                    <stop offset="100%" stopColor="#8F9CB1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="layout">
                <ConditionalNavbar />
                <main className="main">{children}</main>
              </div>
            </ReactQuery>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
