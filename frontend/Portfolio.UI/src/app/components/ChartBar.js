"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import classes from "./ChartBar.module.css";
import { useContext } from "react";
import { LangContext } from "@/contexts/LangContext";

export default function ChartBar({ text, optionsIcon, width, height }) {
  const { lang, toggleLang } = useContext(LangContext);
  const chartData = [
    { month: "Jan", count: 2 },
    { month: "Feb", count: 5 },
    { month: "Mar", count: 0 },
    { month: "Apr", count: 3 },
    { month: "May", count: 7 },
    { month: "Jun", count: 1 },
    { month: "Jul", count: 4 },
    { month: "Aug", count: 6 },
    { month: "Sep", count: 2 },
    { month: "Oct", count: 8 },
    { month: "Nov", count: 1 },
    { month: "Dec", count: 0 },
  ];
  const texts = {
    tr: {
      monthInfo: [
        { month: "Oca", count: 2 },
        { month: "Şub", count: 5 },
        { month: "Mar", count: 0 },
        { month: "Nis", count: 3 },
        { month: "May", count: 7 },
        { month: "Haz", count: 1 },
        { month: "Tem", count: 4 },
        { month: "Ağu", count: 6 },
        { month: "Eyl", count: 2 },
        { month: "Eki", count: 8 },
        { month: "Kas", count: 1 },
        { month: "Ara", count: 0 },
      ],
    },
    en: {
      monthInfo: [
        { month: "Jan", count: 2 },
        { month: "Feb", count: 5 },
        { month: "Mar", count: 0 },
        { month: "Apr", count: 3 },
        { month: "May", count: 7 },
        { month: "Jun", count: 1 },
        { month: "Jul", count: 4 },
        { month: "Aug", count: 6 },
        { month: "Sep", count: 2 },
        { month: "Oct", count: 8 },
        { month: "Nov", count: 1 },
        { month: "Dec", count: 0 },
      ],
    },
  };

  return (
    <div className={classes.div}>
      <div className={classes.divContainer}>
        <div className={classes.textOptionsContainer}>
          <h1 className={classes.text}>{text}</h1>
          <span>{optionsIcon}</span>
        </div>
        <div>
          <BarChart width={width} height={height} data={texts[lang].monthInfo}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="url(#gold-stroke)"
              barSize={20}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
