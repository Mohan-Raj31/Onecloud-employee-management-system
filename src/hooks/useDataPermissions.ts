import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  DataPermissionFormData,
} from "../types";

import {
  createDataPermission,
  getDataPermission,
  getDataPermissions,
  updateDataPermission,
} from "../services/dataPermissionService";

export const dataPermissionKeys = {
  all: ["data-permissions"] as const,

  detail: (id: number) =>
    ["data-permissions", id] as const,
};

export function useDataPermissions() {
  return useQuery({
    queryKey: dataPermissionKeys.all,
    queryFn: getDataPermissions,
    staleTime: 30_000,
  });
}

export function useDataPermission(
  id: number,
) {
  return useQuery({
    queryKey:
      dataPermissionKeys.detail(id),

    queryFn: () =>
      getDataPermission(id),

    enabled: Number.isFinite(id),

    staleTime: 30_000,
  });
}

export function useCreateDataPermission() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: DataPermissionFormData,
    ) => createDataPermission(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          dataPermissionKeys.all,
      });
    },
  });
}

export function useUpdateDataPermission() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: DataPermissionFormData;
    }) =>
      updateDataPermission(
        id,
        data,
      ),

    onSuccess: async (item) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey:
            dataPermissionKeys.all,
        }),

        queryClient.invalidateQueries({
          queryKey:
            dataPermissionKeys.detail(
              item.id,
            ),
        }),
      ]);
    },
  });
}
