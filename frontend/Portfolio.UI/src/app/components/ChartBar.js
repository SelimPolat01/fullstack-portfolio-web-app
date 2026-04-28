"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import classes from "./ChartBar.module.css";

export default function ChartBar({ text, optionsIcon, width, height }) {
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

  return (
    <div className={classes.div}>
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
    </div>
  );
}
