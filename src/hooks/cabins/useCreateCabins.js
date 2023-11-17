import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinApi } from "@/services/apiCabins";

export function useCreateCabins() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] }); //refetch
    }
  })

  return {
    createCabin,
    isPending
  }
}