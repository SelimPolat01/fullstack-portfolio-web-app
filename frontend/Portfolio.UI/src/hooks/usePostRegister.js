import { useMutation } from "@tanstack/react-query";
import { Fetch } from "../lib/fetch";

async function postRegister(body) {
  return await Fetch(null, "admin", "register", "POST", body);
}

export function usePostRegister() {
  return useMutation({
    mutationFn: ({ body }) => postRegister(body),
  });
}
