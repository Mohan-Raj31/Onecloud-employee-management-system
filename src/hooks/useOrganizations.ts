import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type { Organization } from "../types";

import {
  createOrganization,
  getOrganization,
  getOrganizationManagementData,
  updateOrganization,
} from "../services/organizationService";

export const organizationKeys = {
  all: ["organization-management"] as const,

  detail: (id: number) =>
    ["organization-management", id] as const,
};

export function useOrganizations() {
  return useQuery({
    queryKey: organizationKeys.all,
    queryFn: getOrganizationManagementData,
    staleTime: 30_000,
  });
}

export function useOrganization(id: number) {
  return useQuery({
    queryKey: organizationKeys.detail(id),
    queryFn: () => getOrganization(id),
    enabled: Number.isFinite(id),
    staleTime: 30_000,
  });
}

export function useCreateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: Omit<Organization, "id" | "createdAt">,
    ) => createOrganization(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: organizationKeys.all,
      });
    },
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Omit<Organization, "id" | "createdAt">;
    }) =>
      updateOrganization(id, data),

    onSuccess: async (organization) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: organizationKeys.all,
        }),

        queryClient.invalidateQueries({
          queryKey: organizationKeys.detail(
            organization.id,
          ),
        }),
      ]);
    },
  });
}