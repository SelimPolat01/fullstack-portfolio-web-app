import { useMutation } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

async function putEmail(token, body) {
  return await Fetch(token, "admin", "update-email", "PUT", body);
}

export function usePutEmail() {
  return useMutation({
    mutationFn: ({ token, body }) => putEmail(token, body),
  });
}
