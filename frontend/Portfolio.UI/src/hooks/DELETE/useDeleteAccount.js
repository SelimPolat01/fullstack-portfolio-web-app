import { useMutation } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

export async function deleteAccount(token) {
  return await Fetch(token, "admin", "delete-account", "DELETE", null);
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: ({ token }) => deleteAccount(token),
  });
}
