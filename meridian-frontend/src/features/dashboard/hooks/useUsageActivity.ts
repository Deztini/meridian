import { useQuery } from "@tanstack/react-query";
import { getUsageActivity } from "../services/dashboard.service";

export function useUsageActivity() {
  return useQuery({
    queryKey: ["usage-activity"],
    queryFn: getUsageActivity,
    select: (res) => res.data?.points,
  });
}
