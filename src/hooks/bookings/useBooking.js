import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "@/services/apiBookings";

export function useBooking() {
  const { id } = useParams();

  const { data: booking, isPending, error } = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBooking(id)
  });

  return {
    booking,
    isPending,
    error
  }
}