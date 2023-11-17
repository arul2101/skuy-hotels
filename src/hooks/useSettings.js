import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../services/apiSettings";

export function useSettings() {
  const { data: settings, isPending } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isPending }
}