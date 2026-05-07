import { useQuery } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

export async function getEmail(token) {
  return await Fetch(token, "admin", "get-email", "GET", null);
}

export function useGetEmail(token) {
  return useQuery({
    queryKey: ["email", token],
    queryFn: () => getEmail(token),
    enabled: !!token && token !== undefined && token !== "",
  });
}
