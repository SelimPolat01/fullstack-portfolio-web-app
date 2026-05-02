import { useQuery } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

async function getProjects(orderBy, descending, category, status) {
  let url = `all-projects?orderBy=${orderBy}&descending=${descending}`;
  if (category) url += `&category=${encodeURIComponent(category)}`;
  if (status) url += `&status=${encodeURIComponent(status)}`;
  return await Fetch(null, "project", url, "GET", null);
}

export function useGetProjects(orderBy, descending, category, status) {
  return useQuery({
    queryFn: () => getProjects(orderBy, descending, category, status),
    queryKey: ["projects", orderBy, descending, category, status],
    retry: false,
  });
}
