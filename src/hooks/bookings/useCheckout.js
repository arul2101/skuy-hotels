import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/services/supabase";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isPending } = useMutation({
    mutationFn: async (bookingId) => {
      const { data, error } = await supabase
        .from('bookings')
        .update({
          status: "checked-out"
        })
        .eq("id", bookingId);

      if (error) {
        throw new Error("Booking could not be updated");
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    }
  })

  return { checkOut, isPending }
}