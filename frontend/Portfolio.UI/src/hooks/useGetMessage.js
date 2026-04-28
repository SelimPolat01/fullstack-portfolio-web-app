import { useQuery } from "@tanstack/react-query";
import { Fetch } from "../lib/fetch";

export async function getMessage(token, messageId) {
  return await Fetch(token, "message", messageId, "GET", null);
}

export function useGetMessage(token, messageId) {
  return useQuery({
    queryKey: ["message", token, messageId],
    queryFn: () => getMessage(token, messageId),
    enabled: !!token,
  });
}
