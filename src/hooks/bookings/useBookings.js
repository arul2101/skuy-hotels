import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/services/apiBookings";

export function useBookings() {
  const { data: bookings, isPending, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return {
    bookings,
    isPending,
    error
  }
}