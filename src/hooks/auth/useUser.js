import { getCurrentUser } from '@/services/apiAuth';
import { useQuery } from '@tanstack/react-query';

export function useUser() {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  })

  return {
    user,
    isPending,
    isAuthenticated: user?.role === "authenticated"
  }
}