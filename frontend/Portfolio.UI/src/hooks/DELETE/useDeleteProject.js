import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

export async function deleteProject(token, projectId) {
  return await Fetch(token, "project", projectId, "DELETE", null);
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, projectId }) => deleteProject(token, projectId),
    onSuccess: (_, variables) =>
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      }),
  });
}
