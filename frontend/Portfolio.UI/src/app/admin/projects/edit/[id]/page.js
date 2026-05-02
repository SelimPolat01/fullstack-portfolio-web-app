"use client";

import ProjectForm from "../../../../components/ProjectForm/ProjectForm";
import { useGetProject } from "../../../../../hooks/GET/useGetProject";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePutProject } from "../../../../../hooks/PUT/usePutProject";

export default function EditProject() {
  const params = useParams();
  const projectId = params.id;
  const router = useRouter();
  const [token, setToken] = useState(null);
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    setToken(currentToken);
    if (!currentToken) router.replace("/login");
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
          console.log(data?.result?.message);
          router.replace("/admin/projects");
        },
        onError: (err) => {
          console.log(err);
          router.replace("/error");
          return;
        },
      },
    );
  };

  if (getIsLoading) return <div>Loading project details...</div>;
  if (getIsError)
    return <div style={{ color: "red" }}>Error loading project.</div>;
  if (!getData || !getData.result) return null;

  return (
    <ProjectForm
      title="Edit Project"
      buttonText="Update Project"
      initialData={getData?.result}
      onSubmitForm={handleUpdateProject}
      isLoading={putIsPending}
      editProject
    />
  );
}
