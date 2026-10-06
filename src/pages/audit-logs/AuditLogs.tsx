import { useMemo, useState } from "react";

import { useArchiveAuditLog, useAuditLogs } from "../../hooks/useAuditLogs";

import { exportAuditLogs } from "../../services/auditLogService";

import type {
  AuditActivityType,
  AuditCategory,
  AuditLog,
  AuditLogStatus,
} from "../../types";

const categories: Array<AuditCategory | "All"> = [
  "All",
  "User",
  "System",
  "Security",
  "Configuration",
  "Workflow",
];

const activityTypes: Array<AuditActivityType | "All"> = [
  "All",
  "Create",
  "Update",
  "Delete",
  "Login",
  "Logout",
  "Approval",
  "Configuration",
];

const statuses: Array<AuditLogStatus | "All"> = [
  "All",
  "Success",
  "Failed",
  "Warning",
];

const modules = [
  "All",
  "User Management",
  "Authentication",
  "Roles",
  "Platform Configuration",
  "Organizations",
];

function AuditLogs() {
  const { data: auditLogs = [], isLoading } = useAuditLogs();

  const archiveMutation = useArchiveAuditLog();

  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const [category, setCategory] = useState<AuditCategory | "All">("All");

  const [moduleName, setModuleName] = useState("All");

  const [activityType, setActivityType] = useState<AuditActivityType | "All">(
    "All",
  );

  const [status, setStatus] = useState<AuditLogStatus | "All">("All");

  const [organization, setOrganization] = useState("Global Enterprise");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const searchMatch =
        !searchText ||
        log.auditId.toLowerCase().includes(searchText.toLowerCase()) ||
        log.username.toLowerCase().includes(searchText.toLowerCase()) ||
        log.moduleName.toLowerCase().includes(searchText.toLowerCase()) ||
        log.activityPerformed.toLowerCase().includes(searchText.toLowerCase());

      const categoryMatch =
        category === "All" || log.auditCategory === category;

      const moduleMatch = moduleName === "All" || log.moduleName === moduleName;

      const activityMatch =
        activityType === "All" || log.activityType === activityType;

      const statusMatch = status === "All" || log.status === status;

      const organizationMatch =
        !organization || log.organization === organization;

      return (
        searchMatch &&
        categoryMatch &&
        moduleMatch &&
        activityMatch &&
        statusMatch &&
        organizationMatch
      );
    });
  }, [
    auditLogs,
    searchText,
    category,
    moduleName,
    activityType,
    status,
    organization,
  ]);

  const handleSearch = () => {
    setSearchText(search.trim());
  };

  const handleResetFilters = () => {
    setSearch("");
    setSearchText("");
    setCategory("All");
    setModuleName("All");
    setActivityType("All");
    setStatus("All");
    setOrganization("Global Enterprise");
    setFromDate("");
    setToDate("");
  };

  const handleArchive = (log: AuditLog) => {
    if (log.archived) {
      return;
    }

    const confirmed = window.confirm(`Archive audit log ${log.auditId}?`);

    if (!confirmed) {
      return;
    }

    archiveMutation.mutate(log.auditId);

    if (selectedLog?.auditId === log.auditId) {
      setSelectedLog({
        ...log,
        archived: true,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-slate-500">Loading audit logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
     
      <div>
        <h1 className="text-[31px] font-extrabold tracking-[-1px] max-[650px]:text-[25px] bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-transparent">Audit Logs</h1>

        <p className="mt-1 text-sm font-medium text-[#667085]">
          Search, monitor, and review system audit activities.
        </p>
      </div>

     
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search by Log ID, Username, Module or Event"
            className="min-h-11 flex-1 rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <button
            type="button"
            onClick={handleSearch}
            className="min-h-11 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Search
          </button>
        </div>
      </section>

      
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Filters</h2>

            <p className="text-xs text-slate-500">Narrow down audit records.</p>
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Reset
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <FilterSelect
            label="Organization"
            value={organization}
            onChange={setOrganization}
            options={["Global Enterprise"]}
          />

          <FilterSelect
            label="Module"
            value={moduleName}
            onChange={setModuleName}
            options={modules}
          />

          <FilterSelect
            label="Event Type"
            value={activityType}
            onChange={(value) =>
              setActivityType(value as AuditActivityType | "All")
            }
            options={activityTypes}
          />

          <FilterSelect
            label="Audit Category"
            value={category}
            onChange={(value) => setCategory(value as AuditCategory | "All")}
            options={categories}
          />

          <FilterSelect
            label="Status"
            value={status}
            onChange={(value) => setStatus(value as AuditLogStatus | "All")}
            options={statuses}
          />

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              From
            </label>

            <input
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              To
            </label>

            <input
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </section>

      {/* Records */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Audit Log Records
            </h2>

            <p className="text-xs text-slate-500">
              {filteredLogs.length} record
              {filteredLogs.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => exportAuditLogs(filteredLogs)}
              disabled={!filteredLogs.length}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Export
            </button>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Log ID",
                  "Module",
                  "Event Type",
                  "User",
                  "Time",
                  "IP Address",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4 text-sm font-semibold text-indigo-600">
                    {log.auditId}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {log.moduleName}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {log.activityType}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-800">
                      {log.username}
                    </p>
                    <p className="text-xs text-slate-500">{log.role}</p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {log.timestamp}
                  </td>

                  <td className="px-5 py-4 font-mono text-xs text-slate-600">
                    {log.ipAddress}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={log.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="rounded-lg border border-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-50"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet */}
        <div className="space-y-3 p-4 xl:hidden">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-indigo-600">
                    {log.auditId}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {log.activityPerformed}
                  </p>
                </div>

                <StatusBadge status={log.status} />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <InfoItem label="Module" value={log.moduleName} />

                <InfoItem label="Event Type" value={log.activityType} />

                <InfoItem label="User" value={log.username} />

                <InfoItem label="Time" value={log.timestamp} />

                <InfoItem label="IP Address" value={log.ipAddress} />
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLog(log)}
                  className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
                >
                  View
                </button>
              </div>
            </div>
          ))}

          {!filteredLogs.length && (
            <div className="py-10 text-center text-sm text-slate-500">
              No audit logs found.
            </div>
          )}
        </div>
      </section>

      {/* View Details Modal */}
      {selectedLog && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center mt-20 bg-black/50 p-4 md:left-[150px] md:mt-0"
          onClick={() => setSelectedLog(null)}
        >
          <div
            className="relative w-[92%] sm:w-[88%] md:w-[90%] lg:w-[80%] xl:w-full max-w-4xl max-h-[75vh] md:max-h-[70vh] lg:max-h-[75vh] overflow-y-auto rounded-xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Audit Log Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedLog.auditId}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="rounded-lg px-3 py-2 text-xl text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <InfoItem label="Audit ID" value={selectedLog.auditId} />

              <InfoItem label="Category" value={selectedLog.auditCategory} />

              <InfoItem label="Module" value={selectedLog.moduleName} />

              <InfoItem
                label="Activity Type"
                value={selectedLog.activityType}
              />

              <InfoItem label="User ID" value={selectedLog.userId} />

              <InfoItem label="Username" value={selectedLog.username} />

              <InfoItem label="Role" value={selectedLog.role} />

              <InfoItem label="Organization" value={selectedLog.organization} />

              <InfoItem label="Tenant" value={selectedLog.tenant} />

              <InfoItem label="Timestamp" value={selectedLog.timestamp} />

              <InfoItem label="IP Address" value={selectedLog.ipAddress} />

              <InfoItem label="Device" value={selectedLog.deviceInformation} />

              <InfoItem
                label="Browser"
                value={selectedLog.browserInformation}
              />

              <InfoItem label="Status" value={selectedLog.status} />

              <div className="sm:col-span-2">
                <InfoItem
                  label="Activity"
                  value={selectedLog.activityPerformed}
                />
              </div>

              <div className="sm:col-span-2">
                <InfoItem
                  label="Previous Value"
                  value={selectedLog.previousValue}
                />
              </div>

              <div className="sm:col-span-2">
                <InfoItem label="New Value" value={selectedLog.newValue} />
              </div>

              <div className="sm:col-span-2">
                <InfoItem label="Remarks" value={selectedLog.remarks} />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 p-5">
              <button
                type="button"
                onClick={() => exportAuditLogs([selectedLog])}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Export
              </button>

              <button
                type="button"
                disabled={selectedLog.archived}
                onClick={() => handleArchive(selectedLog)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-40"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-indigo-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function StatusBadge({ status }: { status: AuditLogStatus }) {
  const classes = {
    Success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Failed: "bg-red-50 text-red-700 border-red-200",
    Warning: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${classes[status]}`}
    >
      {status}
    </span>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-medium text-slate-700">
        {value}
      </p>
    </div>
  );
}

export default AuditLogs;
