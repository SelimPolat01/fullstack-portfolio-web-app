import { useQuery } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

export async function getSiteSettings(token) {
  if (!token || token === "null" || token === "undefined" || token === "") {
    return null;
  }
  return await Fetch(token, "siteSettings", "get-site-settings", "GET", null);
}

export function useGetSiteSettings(token) {
  return useQuery({
    queryKey: ["siteSettings", token],
    queryFn: () => getSiteSettings(token),
    enabled: !!token,
    retry: false,
  });
}
