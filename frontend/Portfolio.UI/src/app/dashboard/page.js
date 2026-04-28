"use client";

import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Folder,
  MessageSquare,
  MoreVertical,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Frame from "../components/Frame";
import classes from "./Dashboard.module.css";
import { useGetMessages } from "@/hooks/useGetMessages";
import { useEffect, useState } from "react";
import ChartBar from "../components/ChartBar";
import HalfCircleProgress from "../components/HalfCircleProgress";

export default function Dashboard() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const { data, isLoading, isError, error } = useGetMessages(token);
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
  const progressData = [
    { name: "Full", value: 75 },
    { name: "Empty", value: 25 },
  ];

  const COLORS = ["#3b82f6", "#e5e7eb"];

  return (
    <main>
      <div className={classes.div}>
        <div className={classes.frameDiv}>
          <Frame
            className={classes.frame}
            icon={<MessageSquare />}
            text="Messages"
            total={data?.result?.length}
            change="11.46%"
            changeIcon={<ArrowUp />}
            upChange
          />
          <Frame
            className={classes.frame}
            icon={<Folder />}
            text="Projects"
            total="13"
            change="32.63%"
            changeIcon={<ArrowDown />}
            downChange
          />
          <Frame
            className={classes.frame}
            icon={<Briefcase />}
            text="Works"
            total="2"
            change="7.13%"
            changeIcon={<ArrowDown />}
            downChange
          />
          <ChartBar
            width="696"
            height="250"
            text="Monthly Projects"
            optionsIcon={<MoreVertical />}
          />
          <HalfCircleProgress
            text="Monthly Target"
            subText="Target you've set for each month"
            percent="77"
            change="21"
            description="You earn $4156 today. It's higher than last month. Good work!"
            upChange={<ArrowUp />}
            downChange={<ArrowDown />}
            optionsIcon={<MoreVertical />}
          />
        </div>
      </div>
    </main>
  );
}
