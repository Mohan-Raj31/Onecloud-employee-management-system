import { useQuery } from "@tanstack/react-query";
import { getSuperAdminDashboard } from "../services/dashboardService";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  global: ["dashboard", "global"] as const,
};

export function useSuperAdminDashboard() {
  return useQuery({
    queryKey: dashboardKeys.global,
    queryFn: getSuperAdminDashboard,
    staleTime: 30_000,
  });
}
