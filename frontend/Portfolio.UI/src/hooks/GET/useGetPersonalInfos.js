import { useQuery } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

export async function getPersonalInfos(token) {
  if (!token || token === "null" || token === "undefined" || token === "") {
    return null;
  }
  return await Fetch(token, "admin", "personal-info", "GET", null);
}

export function useGetPersonalInfos(token) {
  return useQuery({
    queryKey: ["personalInfos", token],
    queryFn: () => getPersonalInfos(token),
    enabled: !!token,
    retry: false,
  });
}
