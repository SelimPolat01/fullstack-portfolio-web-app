"use client";

import ProjectForm from "../../../../components/ProjectForm/ProjectForm";
import { useGetProject } from "../../../../../hooks/GET/useGetProject";
import { useParams, useRouter } from "next/navigation";
import { use, useContext, useEffect, useState } from "react";
import { usePutProject } from "../../../../../hooks/PUT/usePutProject";
import { LangContext } from "@/contexts/LangContext";

export default function EditProject() {
  const params = useParams();
  const projectId = params.id;
  const [isSuccess, setIsSucsess] = useState(false);
  const router = useRouter();
  const { lang, toggleLang } = useContext(LangContext);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (!currentToken) {
      router.replace("/admin/login");
      return;
    }
  }, [router]);
  const {
    data: getData,
    isLoading: getIsLoading,
    isError: getIsError,
    error: getError,
  } = useGetProject(projectId);
  const {
    mutate: putMutate,
    isPending: putIsPending,
    isError: putIsError,
    error: putError,
  } = usePutProject();

  const handleUpdateProject = (formData) => {
    putMutate(
      {
        token: token,
        body: formData,
        projectId: projectId,
      },
      {
        onSuccess: (data) => {
          setIsSucsess(true);
        },
        onError: (err) => {
          console.log(err);
          router.replace("/error");
          return;
        },
      },
    );
  };

  const texts = {
    tr: {
      loading: "Proje Yükleniyor...",
    },
    en: {
      loading: "Loading Project...",
    },
  };

  if (getIsLoading) {
    return (
      <div className="loadingContainer">
        <p>{texts[lang].loading}</p>
      </div>
    );
  }

  if (getIsError) {
    return (
      <div className="loadingContainer">
        <p>{error?.message || "An error occured"}</p>
      </div>
    );
  }

  return (
    <ProjectForm
      title="Edit Project"
      buttonText="Update Project"
      initialData={getData?.result}
      onSubmitForm={handleUpdateProject}
      isLoading={putIsPending}
      isSuccess={isSuccess}
      setIsSuccess={setIsSucsess}
      editProject
    />
  );
}
