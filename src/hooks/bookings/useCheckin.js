import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "@/services/apiBookings";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isPending } = useMutation({
    mutationFn: updateBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate("/bookings");
    },
  });

  return { checkIn, isPending };
}