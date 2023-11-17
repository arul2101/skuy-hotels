import { login as loginApi } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (request) => loginApi(request),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user); //set query data to cache
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => console.log(err)
  })

  return {
    login,
    isPending
  }
}