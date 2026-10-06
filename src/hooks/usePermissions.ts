import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  PermissionFormData,
} from "../types";

import {
  createPermission,
  getPermission,
  getPermissions,
  updatePermission,
} from "../services/permissionService";

export const permissionKeys = {
  all: ["permissions"] as const,

  detail: (id: number) =>
    ["permissions", id] as const,
};

export function usePermissions() {
  return useQuery({
    queryKey: permissionKeys.all,
    queryFn: getPermissions,
    staleTime: 30_000,
  });
}

export function usePermission(
  id: number,
) {
  return useQuery({
    queryKey:
      permissionKeys.detail(id),
    queryFn: () => getPermission(id),
    enabled: Number.isFinite(id),
    staleTime: 30_000,
  });
}

export function useCreatePermission() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: PermissionFormData,
    ) => createPermission(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          permissionKeys.all,
      });
    },
  });
}

export function useUpdatePermission() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: PermissionFormData;
    }) =>
      updatePermission(id, data),

    onSuccess: async (
      permission,
    ) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey:
            permissionKeys.all,
        }),

        queryClient.invalidateQueries({
          queryKey:
            permissionKeys.detail(
              permission.id,
            ),
        }),
      ]);
    },
  });
}
