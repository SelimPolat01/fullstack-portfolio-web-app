import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

async function postMessage(body) {
  return await Fetch(null, "message", null, "POST", body);
}

export function usePostMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ body }) => postMessage(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}
