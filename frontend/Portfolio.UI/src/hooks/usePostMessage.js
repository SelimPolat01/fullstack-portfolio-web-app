import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetch } from "../lib/fetch";

async function postMessage(token, body) {
  return await Fetch(token, "message", null, "POST", body);
}

export function usePostMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, body }) => postMessage(token, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}
