import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

async function putPersonalInfos(token, body) {
  return await Fetch(token, "admin", "personal-info", "PUT", body);
}

export function usePutPersonalInfos() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, body }) => putPersonalInfos(token, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["personalInfos", variables.token],
      });
    },
  });
}
