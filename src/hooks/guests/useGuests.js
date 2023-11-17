import { useQuery } from "@tanstack/react-query";
import { getGuests } from "@/services/apiGuests";

export function useGuests() {
  const { data: guests, isPending, error } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests
  })

  return { guests, isPending, error };
}