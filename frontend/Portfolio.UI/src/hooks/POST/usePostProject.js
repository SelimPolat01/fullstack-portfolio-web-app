import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

async function postMessage(token, body) {
  return await Fetch(token, "project", "add-project", "POST", body);
}

export function usePostProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, body }) => postMessage(token, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", variables.token],
      });
    },
  });
}
