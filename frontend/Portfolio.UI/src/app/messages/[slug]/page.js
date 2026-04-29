"use client";

import { useGetMessage } from "@/hooks/useGetMessage";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import classes from "./Message.module.css";
import { Check, CheckCheck, Clock } from "lucide-react";

export default function Message() {
  const params = useParams();
  const messageId = params.slug;
  const [token, setToken] = useState(null);
  const { data, isLoading, isError, error } = useGetMessage(token, messageId);
  const date = new Date(data?.result.createdAt);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  if (isLoading) return <span>Loading...</span>;
  if (isError || !data?.result) return <span>Mesaj bulunamadı.</span>;

  return (
    <div className={classes.flexMessage}>
      <div className={classes.messageContainer}>
        <div className={classes.sender}>
          <strong>Full Name: </strong>
          <span>{data?.result?.sender}</span>
        </div>
        <div className={classes.sender}>
          <strong>Email: </strong>
          <span>{data?.result?.email}</span>
        </div>
        <div className={classes.sender}>
          <strong>Phone Number: </strong>
          <span>{data?.result?.phoneNumber}</span>
        </div>
        <div className={classes.sender}>
          <strong>Message: </strong>
          <span>{data?.result?.text}</span>
        </div>
        <div className={classes.sender}>
          <strong>{<Clock stroke="url(#magic-gradient)" />}</strong>
          <span>{date.toLocaleString("tr-TR")}</span>{" "}
          <span className={classes.isRead}>
            {data?.result?.isRead ? (
              <CheckCheck stroke="url(#gold-stroke)" />
            ) : (
              <Check stroke="url(#unread-gradient)" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
