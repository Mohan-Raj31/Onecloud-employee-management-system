import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type { Feature } from "../types";

import {
  getFeatures,
  setFeatureStatus,
  updateFeature,
} from "../services/featureService";

export const featureKeys = {
  all: ["features"] as const,

  detail: (id: number) =>
    ["features", id] as const,
};

export function useFeatures() {
  return useQuery({
    queryKey: featureKeys.all,
    queryFn: getFeatures,
    staleTime: 30_000,
  });
}

export function useUpdateFeature() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Feature>;
    }) =>
      updateFeature(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: featureKeys.all,
      });
    },
  });
}

export function useSetFeatureStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: Feature["status"];
    }) =>
      setFeatureStatus(id, status),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: featureKeys.all,
      });
    },
  });
}
