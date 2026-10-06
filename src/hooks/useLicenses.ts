import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type {
  LicenseStatus,
} from "../types";

import {
  createLicense,
  getLicenses,
  renewLicense,
  updateLicenseStatus,
} from "../services/licenseService";

export const licenseKeys = {
  all: ["licenses"] as const,

  detail: (id: number) =>
    ["licenses", id] as const,
};

export function useLicenses() {
  return useQuery({
    queryKey: licenseKeys.all,
    queryFn: getLicenses,
    staleTime: 30_000,
  });
}

export function useCreateLicense() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createLicense,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: licenseKeys.all,
      });
    },
  });
}

export function useUpdateLicenseStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: LicenseStatus;
    }) =>
      updateLicenseStatus(
        id,
        status,
      ),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: licenseKeys.all,
      });
    },
  });
}

export function useRenewLicense() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: renewLicense,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: licenseKeys.all,
      });
    },
  });
}
