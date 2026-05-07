import { useQuery } from "@tanstack/react-query";
import { Fetch } from "../../lib/fetch";

export async function getEmailConflict(email) {
  return await Fetch(
    null,
    "admin",
    `is-email-already-registered?email=${email}`,
    "GET",
    null,
  );
}

export function useGetEmailConflict(email, isBlur, isValidEmail) {
  return useQuery({
    queryKey: [email],
    queryFn: () => getEmailConflict(email),
    enabled: !!email && isBlur && isValidEmail,
    retry: false,
  });
}
