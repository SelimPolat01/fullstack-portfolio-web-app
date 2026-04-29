import { Fetch } from "@/lib/fetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function patchMessageRead(token, messageId) {
  return await Fetch(token, "message", messageId, "PATCH", null);
}

export function usePatchMessageRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, messageId }) => patchMessageRead(token, messageId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["messages", variables.token],
      });
      queryClient.invalidateQueries({
        queryKey: ["message", variables.token, variables.messageId],
      });
    },
  });
}
