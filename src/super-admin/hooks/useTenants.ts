import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  activateTenant,
  createTenant,
  deactivateTenant,
  deleteTenant,
  getTenant,
  getTenantStats,
  getTenants,
  updateTenant,
} from "../services/tenantService";
import type { TenantFormData } from "../../types";
import { dashboardKeys } from "./useSuperAdminDashboard";

export const tenantKeys = {
  all: ["tenants"] as const,
  detail: (id: number) => ["tenants", id] as const,
  stats: (id: number) => ["tenants", id, "stats"] as const,
};

export function useTenants() {
  return useQuery({
    queryKey: tenantKeys.all,
    queryFn: getTenants,
    staleTime: 30_000,
  });
}

export function useTenant(id: number) {
  return useQuery({
    queryKey: tenantKeys.detail(id),
    queryFn: () => getTenant(id),
    enabled: Number.isFinite(id),
    staleTime: 30_000,
  });
}

export function useTenantStats(id: number) {
  return useQuery({
    queryKey: tenantKeys.stats(id),
    queryFn: () => getTenantStats(id),
    enabled: Number.isFinite(id),
    staleTime: 30_000,
  });
}

function invalidateTenantQueries(queryClient: ReturnType<typeof useQueryClient>) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: tenantKeys.all }),
    queryClient.invalidateQueries({ queryKey: dashboardKeys.all }),
  ]);
}

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TenantFormData) => createTenant(data),
    onSuccess: async () => {
      await invalidateTenantQueries(queryClient);
    },
  });
}

export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TenantFormData }) =>
      updateTenant(id, data),
    onSuccess: async (tenant) => {
      await Promise.all([
        invalidateTenantQueries(queryClient),
        queryClient.invalidateQueries({ queryKey: tenantKeys.detail(tenant.id) }),
        queryClient.invalidateQueries({ queryKey: tenantKeys.stats(tenant.id) }),
      ]);
    },
  });
}

export function useDeleteTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTenant(id),
    onSuccess: async () => {
      await invalidateTenantQueries(queryClient);
    },
  });
}

export function useActivateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => activateTenant(id),
    onSuccess: async (tenant) => {
      await Promise.all([
        invalidateTenantQueries(queryClient),
        queryClient.invalidateQueries({ queryKey: tenantKeys.detail(tenant.id) }),
        queryClient.invalidateQueries({ queryKey: tenantKeys.stats(tenant.id) }),
      ]);
    },
  });
}

export function useDeactivateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deactivateTenant(id),
    onSuccess: async (tenant) => {
      await Promise.all([
        invalidateTenantQueries(queryClient),
        queryClient.invalidateQueries({ queryKey: tenantKeys.detail(tenant.id) }),
        queryClient.invalidateQueries({ queryKey: tenantKeys.stats(tenant.id) }),
      ]);
    },
  });
}
