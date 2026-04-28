"use client";

import classes from "./Messages.module.css";
import { useGetMessages } from "../../hooks/useGetMessages";
import Message from "../components/Message";
import { useRouter } from "next/navigation";

export default function Messages() {
  const router = useRouter();
  const token = localStorage.getItem("token");
  const { data, isLoading, isError, error } = useGetMessages(token);

  return (
    <div className={classes.divContainer}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}
      <h1>Messages</h1>
      <div>
        <div className={classes.flexMessage}>
          {data?.result?.map((message) => {
            return (
              <Message
                onClick={() => router.replace(`/messages/${message.id}`)}
                key={message.id}
                message={message}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
