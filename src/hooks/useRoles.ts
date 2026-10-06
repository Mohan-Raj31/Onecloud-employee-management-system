import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  RoleFormData,
} from "../types";

import {
  createRole,
  getRole,
  getRoles,
  updateRole,
} from "../services/roleService";

export const roleKeys = {
  all: ["roles"] as const,

  detail: (id: number) =>
    ["roles", id] as const,
};

export function useRoles() {
  return useQuery({
    queryKey: roleKeys.all,
    queryFn: getRoles,
    staleTime: 30_000,
  });
}

export function useRole(id: number) {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: () => getRole(id),
    enabled: Number.isFinite(id),
    staleTime: 30_000,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: RoleFormData,
    ) => createRole(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: roleKeys.all,
      });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: RoleFormData;
    }) => updateRole(id, data),

    onSuccess: async (role) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: roleKeys.all,
        }),

        queryClient.invalidateQueries({
          queryKey: roleKeys.detail(
            role.id,
          ),
        }),
      ]);
    },
  });
}