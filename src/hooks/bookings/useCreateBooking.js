import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "@/services/apiBookings";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate: createBooking, isPending } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] }); //refetch
    }
  })

  return { createBooking, isPending };
}