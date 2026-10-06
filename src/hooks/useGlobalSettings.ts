import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getGlobalSettings,
  resetGlobalSettings,
  updateGlobalSettings,
} from "../services/globalSettingsService";

import type { GlobalSettings } from "../types";

export const globalSettingsKeys = {
  all: ["global-settings"] as const,
};

export function useGlobalSettings() {
  return useQuery({
    queryKey: globalSettingsKeys.all,
    queryFn: getGlobalSettings,
    staleTime: 30_000,
  });
}

export function useUpdateGlobalSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      settings: GlobalSettings,
    ) => updateGlobalSettings(settings),

    onSuccess: async (settings) => {
      queryClient.setQueryData(
        globalSettingsKeys.all,
        settings,
      );
    },
  });
}

export function useResetGlobalSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetGlobalSettings,

    onSuccess: async (settings) => {
      queryClient.setQueryData(
        globalSettingsKeys.all,
        settings,
      );
    },
  });
}