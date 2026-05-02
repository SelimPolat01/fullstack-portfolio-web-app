import React, { useContext } from "react";
import { PieChart, Pie } from "recharts";
import classes from "./HalfCircleProgress.module.css";
import { LangContext } from "@/contexts/LangContext";

export default function HalfCircleProgress({
  text,
  subText,
  percent = 75,
  change,
  description,
  upChange,
  downChange,
  optionsIcon,
}) {
  const { lang, toggleLang } = useContext(LangContext);
  const data = [
    { name: "Dolu", value: 75, fill: "#3b82f6" },
    { name: "Boş", value: 25, fill: "#e5e7eb" },
  ];
  const texts = {
    tr: {
      cashInfos: ["Hedef", "Hasılat", "Bugün"],
    },
    en: { cashInfos: ["Target", "Revenue", "Today"] },
  };
  const COLORS = ["#3b82f6", "#e5e7eb"];

  return (
    <div className={classes.div}>
      <div className={classes.divContainer}>
        <div className={classes.textContainer}>
          <h2 className={classes.text}>{text}</h2>
          <span>{optionsIcon}</span>
        </div>
        <div className={classes.subTextContainer}>
          <p className={classes.subText}>{subText}</p>
        </div>
        <div className={classes.circleBarContainer}>
          <PieChart width={200} height={100}>
            <Pie
              data={data}
              cx={100}
              cy={100}
              startAngle={180}
              endAngle={0}
              innerRadius={65}
              outerRadius={85}
              dataKey="value"
              stroke="none"
              cornerRadius={5}
            />
          </PieChart>
        </div>
        <div className={classes.infoContainer}>
          <div className={classes.percentContainer}>
            <h1 className={classes.percent}>{percent}%</h1>
          </div>
          <div className={`${classes.changeContainer} ${classes.greenBg}`}>
            <p className={`${classes.change} ${classes.upChange}`}>{change}%</p>
          </div>
          <div className={classes.descriptionContainer}>
            <p className={classes.description}>{description}</p>
          </div>
        </div>
      </div>
      <div>
        <div className={classes.subDiv}>
          <div className={classes.textDiv}>
            <div>
              <span className={classes.textCash}>
                {texts[lang].cashInfos[0]}
              </span>
              <div className={classes.cashIconContainer}>
                <h2 className={classes.money}>13$K</h2>
                <span className={classes.changeUpIcon}>{upChange}</span>
              </div>
            </div>
            <div>
              <span className={classes.textCash}>
                {texts[lang].cashInfos[1]}
              </span>
              <div className={classes.cashIconContainer}>
                <h2 className={classes.money}>21$K</h2>
                <span className={classes.changeUpIcon}>{upChange}</span>
              </div>
            </div>
            <div>
              <span className={classes.textCash}>
                {texts[lang].cashInfos[2]}
              </span>
              <div className={classes.cashIconContainer}>
                <h2 className={classes.money}>7$K</h2>
                <span className={classes.changeDownIcon}>{downChange}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
