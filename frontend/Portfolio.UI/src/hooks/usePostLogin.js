import { useMutation } from "@tanstack/react-query";
import { Fetch } from "../lib/fetch";

async function postLogin(body) {
  return await Fetch(null, "admin", "login", "POST", body);
}

export function usePostLogin() {
  return useMutation({
    mutationFn: ({ body }) => postLogin(body),
  });
}
