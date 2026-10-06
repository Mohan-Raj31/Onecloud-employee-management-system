import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  archiveAuditLog,
  getAuditLogs,
} from "../services/auditLogService";

export const auditLogKeys = {
  all: ["audit-logs"] as const,
};

export function useAuditLogs() {
  return useQuery({
    queryKey: auditLogKeys.all,
    queryFn: getAuditLogs,
    staleTime: 30_000,
  });
}

export function useArchiveAuditLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (auditId: string) =>
      archiveAuditLog(auditId),

    onSuccess: (logs) => {
      queryClient.setQueryData(
        auditLogKeys.all,
        logs,
      );
    },
  });
}
