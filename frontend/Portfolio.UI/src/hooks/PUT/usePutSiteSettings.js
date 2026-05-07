import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

async function putSiteSettings(token, body) {
  return await Fetch(token, "SiteSettings", "put-site-settings", "PUT", body);
}

export function usePutSiteSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, body }) => putSiteSettings(token, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["site-settings", variables.token],
      });
    },
  });
}
