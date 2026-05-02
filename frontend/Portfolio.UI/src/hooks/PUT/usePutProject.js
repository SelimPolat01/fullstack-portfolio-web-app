import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

async function putProject(token, body, projectId) {
  return await Fetch(token, "project", projectId, "PUT", body);
}

export function usePutProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, body, projectId }) =>
      putProject(token, body, projectId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.token],
      });
      queryClient.invalidateQueries({
        queryKey: ["project", variables.token, variables.projectId],
      });
    },
  });
}
