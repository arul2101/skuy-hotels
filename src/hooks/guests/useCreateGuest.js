import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest as createGuestApi } from "@/services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();
  const { mutate: createGuest, isPending } = useMutation({
    mutationFn: createGuestApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] }); //refetch
    }
  })

  return { createGuest, isPending };
}