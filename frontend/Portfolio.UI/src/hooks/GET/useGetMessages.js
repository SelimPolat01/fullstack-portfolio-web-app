import { useQuery } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

export async function getMessages(token) {
  if (!token || token === "null" || token === "undefined" || token === "") {
    return null;
  }
  return await Fetch(token, "message", "all-messages", "GET", null);
}

export function useGetMessages(token) {
  return useQuery({
    queryKey: ["messages", token],
    queryFn: () => getMessages(token),
    enabled: !!token && token !== undefined && token !== "",
    retry: false,
  });
}
