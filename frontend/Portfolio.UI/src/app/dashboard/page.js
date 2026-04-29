"use client";

import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Folder,
  MessageSquare,
  MoreVertical,
} from "lucide-react";
import Frame from "../components/Frame";
import classes from "./Dashboard.module.css";
import { useGetMessages } from "@/hooks/useGetMessages";
import { useContext, useEffect, useState } from "react";
import ChartBar from "../components/ChartBar";
import HalfCircleProgress from "../components/HalfCircleProgress";
import { LangContext } from "@/contexts/LangContext";

export default function Dashboard() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const { lang, toggleLang } = useContext(LangContext);
  const { data, isLoading, isError, error } = useGetMessages(token);
  const texts = {
    tr: {
      frameTexts: ["Mesajlar", "Projeler", "Çalışmalar"],
      monthlyProjectsText: "Aylık Projeler",
      monthlyCashTargetTexts: [
        "Aylık Gelir Hedefi",
        "Her ay için belirlediğin hedefler",
        "Bugün 4156 $ kazandın. Geçen aya göre daha yüksek. İyi iş!",
      ],
    },
    en: {
      frameTexts: ["Messages", "Projects", "Works"],
      monthlyProjectsText: "Monthly Projects",
      monthlyCashTargetTexts: [
        "Monthly Revenue Target",
        "Target you've set for each month",
        "You earn $4156 today. It's higher than last month. Good work!",
      ],
    },
  };
  const COLORS = ["#3b82f6", "#e5e7eb"];

  return (
    <div className={classes.div}>
      <div className={classes.divContainer}>
        <div className={classes.frameDiv}>
          <Frame
            className={classes.frame}
            icon={<MessageSquare />}
            text={texts[lang].frameTexts[0]}
            total={data?.result?.length}
            change="11.46%"
            changeIcon={<ArrowUp />}
            upChange
          />
          <Frame
            className={classes.frame}
            icon={<Folder />}
            text={texts[lang].frameTexts[1]}
            total="13"
            change="32.63%"
            changeIcon={<ArrowDown />}
            downChange
          />
          <Frame
            className={classes.frame}
            icon={<Briefcase />}
            text={texts[lang].frameTexts[2]}
            total="2"
            change="7.13%"
            changeIcon={<ArrowDown />}
            downChange
          />
          <ChartBar
            width="696"
            height="250"
            text={texts[lang].monthlyProjectsText}
            optionsIcon={<MoreVertical />}
          />
          <HalfCircleProgress
            text={texts[lang].monthlyCashTargetTexts[0]}
            subText={texts[lang].monthlyCashTargetTexts[1]}
            percent="77"
            change="21"
            description={texts[lang].monthlyCashTargetTexts[2]}
            upChange={<ArrowUp />}
            downChange={<ArrowDown />}
            optionsIcon={<MoreVertical />}
          />
        </div>
      </div>
    </div>
  );
}
