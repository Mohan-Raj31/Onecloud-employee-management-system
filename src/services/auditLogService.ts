import { auditLogsData } from "../data/auditLogs";
import type { AuditLog } from "../types";

const AUDIT_LOGS_STORAGE_KEY = "onecloud_audit_logs_v1";

const clone = <T,>(value: T): T =>
  JSON.parse(JSON.stringify(value)) as T;

function readAuditLogs(): AuditLog[] {
  const saved = localStorage.getItem(AUDIT_LOGS_STORAGE_KEY);

  if (!saved) {
    const initial = clone(auditLogsData);

    localStorage.setItem(
      AUDIT_LOGS_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }

  try {
    return JSON.parse(saved) as AuditLog[];
  } catch {
    const initial = clone(auditLogsData);

    localStorage.setItem(
      AUDIT_LOGS_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }
}

function writeAuditLogs(logs: AuditLog[]): void {
  localStorage.setItem(
    AUDIT_LOGS_STORAGE_KEY,
    JSON.stringify(logs),
  );
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  return clone(readAuditLogs());
}

export async function archiveAuditLog(
  auditId: string,
): Promise<AuditLog[]> {
  const logs = readAuditLogs();

  const updatedLogs = logs.map((log) =>
    log.auditId === auditId
      ? { ...log, archived: true }
      : log,
  );

  writeAuditLogs(updatedLogs);

  return clone(updatedLogs);
}

export function exportAuditLogs(logs: AuditLog[]): void {
  const headers = [
    "Audit ID",
    "Category",
    "Module",
    "Activity Type",
    "Username",
    "Organization",
    "Tenant",
    "Activity",
    "Timestamp",
    "IP Address",
    "Status",
  ];

  const rows = logs.map((log) => [
    log.auditId,
    log.auditCategory,
    log.moduleName,
    log.activityType,
    log.username,
    log.organization,
    log.tenant,
    log.activityPerformed,
    log.timestamp,
    log.ipAddress,
    log.status,
  ]);

  const csv = [
    headers,
    ...rows,
  ]
    .map((row) =>
      row
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    )
    .join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "audit-logs.csv";
  link.click();

  URL.revokeObjectURL(url);
}
