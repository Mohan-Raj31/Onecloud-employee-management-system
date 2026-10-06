import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type { PlatformConfiguration } from "../types";

import {
  getPlatformConfiguration,
  updatePlatformConfiguration,
} from "../services/platformConfigurationService";

export const platformConfigurationKeys = {
  all: ["platform-configuration"] as const,
};

export function usePlatformConfiguration() {
  return useQuery({
    queryKey: platformConfigurationKeys.all,
    queryFn: getPlatformConfiguration,
    staleTime: 30_000,
  });
}

export function useUpdatePlatformConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: PlatformConfiguration,
    ) => updatePlatformConfiguration(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: platformConfigurationKeys.all,
      });
    },
  });
}
