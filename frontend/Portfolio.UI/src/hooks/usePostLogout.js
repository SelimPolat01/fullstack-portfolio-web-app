import { useMutation } from "@tanstack/react-query";
import { Fetch } from "../lib/fetch";

async function postLogout(token) {
  return await Fetch(token, "admin", "logout", "POST", null);
}

export function usePostLogout() {
  return useMutation({
    mutationFn: ({ token }) => postLogout(token),
  });
}
