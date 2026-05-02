"use client";

import AddProjectForm from "@/app/components/ProjectForm/ProjectForm";
import classes from "./AddProject.module.css";
import ProjectForm from "@/app/components/ProjectForm/ProjectForm";
import { usePostProject } from "@/hooks/POST/usePostProject";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddProject() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (!currentToken) router.replace("/login");
  }, [router]);
  const { mutate, isPending, isError, error } = usePostProject();

  function submitHandler(formData) {
    mutate(
      {
        token,
        body: formData,
      },
      {
        onSuccess: (data) => {
          router.push("/admin/projects");
        },
        onError: (err) => {
          console.log(err);
          router.replace("/error");
          return;
        },
      },
    );
  }

  return (
    <div className={classes.div}>
      <ProjectForm
        onSubmitForm={submitHandler}
        isLoading={isPending}
        addProject
      />
    </div>
  );
}
