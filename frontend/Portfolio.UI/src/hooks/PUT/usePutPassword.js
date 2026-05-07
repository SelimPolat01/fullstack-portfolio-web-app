import { useMutation } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

async function putPassword(token, body) {
  return await Fetch(token, "admin", "update-password", "PUT", body);
}

export function usePutPassword() {
  return useMutation({
    mutationFn: ({ token, body }) => putPassword(token, body),
  });
}
