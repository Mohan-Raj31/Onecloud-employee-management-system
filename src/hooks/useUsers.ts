import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type { User } from "../types";

import {
  createUser,
  getUser,
  getUsers,
  updateUser,
} from "../services/userService";

export const userKeys = {
  all: ["users"] as const,

  detail: (id: number) =>
    ["users", id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: getUsers,
    staleTime: 30_000,
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUser(id),
    enabled: Number.isFinite(id),
    staleTime: 30_000,
  });
}

export function useCreateUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      data: Omit<User, "id" | "createdAt">,
    ) => createUser(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });
}

export function useUpdateUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Omit<User, "id" | "createdAt">;
    }) =>
      updateUser(id, data),

    onSuccess: async (user) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: userKeys.all,
        }),

        queryClient.invalidateQueries({
          queryKey: userKeys.detail(
            user.id,
          ),
        }),
      ]);
    },
  });
}