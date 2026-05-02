import { useQuery } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

async function getProject(projectId) {
  return await Fetch(null, "project", projectId, "GET", null);
}

export function useGetProject(projectId) {
  return useQuery({
    queryFn: () => getProject(projectId),
    queryKey: ["project", projectId],
    retry: false,
  });
}
