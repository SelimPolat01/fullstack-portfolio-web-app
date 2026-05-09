"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import classes from "./ChartBar.module.css";
import { useContext, useEffect, useMemo, useState } from "react";
import { LangContext } from "@/contexts/LangContext";
import { useGetProjects } from "@/hooks/GET/useGetProjects";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { chartVariants } from "@/lib/variants";

export default function ChartBar({ text, optionsIcon, width, height }) {
  const { lang, toggleLang } = useContext(LangContext);
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (!currentToken) {
      router.replace("/admin/login");
      return;
    }
  }, [router]);
  const { data, isLoading, isError, error } = useGetProjects("Date", true);

  const chartData = useMemo(() => {
    const projects = data?.result || [];
    const monthsTr = [
      "Oca",
      "Şub",
      "Mar",
      "Nis",
      "May",
      "Haz",
      "Tem",
      "Ağu",
      "Eyl",
      "Eki",
      "Kas",
      "Ara",
    ];
    const monthsEn = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonths = lang === "tr" ? monthsTr : monthsEn;
    const monthlyStats = currentMonths.map((m) => ({ month: m, count: 0 }));
    projects.forEach((project) => {
      if (project.date) {
        const projectDate = new Date(project.date);
        const monthIndex = projectDate.getMonth();
        monthlyStats[monthIndex].count += 1;
      }
    });
    return monthlyStats;
  }, [data, lang]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    <p>{error?.message}</p>;
  }

  return (
    <motion.div variants={chartVariants} className={classes.div}>
      <div className={classes.divContainer}>
        <div className={classes.textOptionsContainer}>
          <h1 className={classes.text}>{text}</h1>
          <span>{optionsIcon}</span>
        </div>
        <div>
          <BarChart width={width} height={height} data={chartData}>
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
    </motion.div>
  );
}
