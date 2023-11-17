import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "@/services/apiAuth";

export function useSignUp() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
  });

  return {
    signup,
    isPending
  }
}