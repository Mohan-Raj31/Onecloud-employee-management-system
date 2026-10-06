import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  licenseOrganizationOptions,
  licenseStatusOptions,
  licenseSummaryCards,
  licenseTypeOptions,
} from "../../data/licenses";

import {
  useLicenses,
  useRenewLicense,
  useUpdateLicenseStatus,
} from "../../hooks/useLicenses";

import type { License, LicenseStatus } from "../../types";

function LicenseManagement() {
  const navigate = useNavigate();

  const {
    data: licenses = [],
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useLicenses();

  const updateStatus = useUpdateLicenseStatus();

  const renewLicense = useRenewLicense();

  const [search, setSearch] = useState("");

  const [licenseType, setLicenseType] = useState("All License Types");

  const [status, setStatus] = useState("All Status");

  const [organization, setOrganization] = useState("All Organizations");

  const filteredLicenses = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return licenses.filter((license) => {
      const matchesSearch =
        !searchValue ||
        license.licenseKey.toLowerCase().includes(searchValue) ||
        license.organization.toLowerCase().includes(searchValue);

      const matchesType =
        licenseType === "All License Types" ||
        license.licenseType === licenseType;

      const matchesStatus =
        status === "All Status" || license.status === status;

      const matchesOrganization =
        organization === "All Organizations" ||
        license.organization === organization;

      return (
        matchesSearch && matchesType && matchesStatus && matchesOrganization
      );
    });
  }, [licenses, search, licenseType, status, organization]);

  const summaryValues = {
    total: licenses.length,

    active: licenses.filter((license) => license.status === "Active").length,

    expired: licenses.filter((license) => license.status === "Expired").length,

    suspended: licenses.filter((license) => license.status === "Suspended")
      .length,
  };

  const handleStatusChange = (id: number, nextStatus: LicenseStatus) => {
    updateStatus.mutate({
      id,
      status: nextStatus,
    });
  };

  const handleRenew = (id: number) => {
    renewLicense.mutate(id);
  };

  const clearFilters = () => {
    setSearch("");
    setLicenseType("All License Types");
    setStatus("All Status");
    setOrganization("All Organizations");
  };

  const handleExport = () => {
    const headers = [
      "License Key",
      "Organization",
      "License Type",
      "Activation Date",
      "Expiry Date",
      "Status",
      "Renewal Period",
    ];

    const rows = filteredLicenses.map((license) => [
      license.licenseKey,
      license.organization,
      license.licenseType,
      license.activationDate,
      license.expiryDate,
      license.status,
      license.renewalPeriod,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "onecloud-license-report.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-slate-500">Loading licenses...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
        Failed to load licenses.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[31px] font-extrabold tracking-[-1px] max-[650px]:text-[25px] bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-transparent">
            License Management
          </h1>

          <p className="mt-1 text-sm font-medium text-[#667085]">
            Manage platform licenses and organization access
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/license-management/create")}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2.5 text-l font-bold text-indigo-700 shadow-sm transition hover:bg-blue-50"
        >
          <span className="text-lg leading-none">+</span>
          Create License
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {licenseSummaryCards.map((card) => (
          <SummaryCard
            key={card.key}
            label={card.label}
            description={card.description}
            value={summaryValues[card.key]}
            type={card.key}
          />
        ))}
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FilterSelect
            label="License Type"
            value={licenseType}
            options={licenseTypeOptions}
            onChange={setLicenseType}
          />

          <FilterSelect
            label="Status"
            value={status}
            options={licenseStatusOptions}
            onChange={setStatus}
          />

          <FilterSelect
            label="Organization"
            value={organization}
            options={licenseOrganizationOptions}
            onChange={setOrganization}
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={clearFilters}
            className="text-left text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Clear Filters
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleExport}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Export Report
            </button>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      </section>

      {/* License list */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              License List
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage platform license lifecycle.
            </p>
          </div>

          <span className="text-sm text-slate-500">
            {filteredLicenses.length} license
            {filteredLicenses.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto xl:block">
          <table className="min-w-[1050px] w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">
                <TableHeader>License Key</TableHeader>

                <TableHeader>Organization</TableHeader>

                <TableHeader>Plan</TableHeader>

                <TableHeader>Expiry Date</TableHeader>

                <TableHeader>Status</TableHeader>

                <TableHeader align="right">Actions</TableHeader>
              </tr>
            </thead>

            <tbody>
              {filteredLicenses.map((license) => (
                <LicenseRow
                  key={license.id}
                  license={license}
                  onRenew={() => handleRenew(license.id)}
                  onSuspend={() => handleStatusChange(license.id, "Suspended")}
                  onActivate={() => handleStatusChange(license.id, "Active")}
                  isUpdating={updateStatus.isPending || renewLicense.isPending}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile + tablet cards */}
        <div className="space-y-3 p-4 xl:hidden">
          {filteredLicenses.map((license) => (
            <LicenseCard
              key={license.id}
              license={license}
              onRenew={() => handleRenew(license.id)}
              onSuspend={() => handleStatusChange(license.id, "Suspended")}
              onActivate={() => handleStatusChange(license.id, "Active")}
              isUpdating={updateStatus.isPending || renewLicense.isPending}
            />
          ))}
        </div>

        {filteredLicenses.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-sm font-medium text-slate-600">
              No licenses found
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function SummaryCard({
  label,
  description,
  value,
  type,
}: {
  label: string;
  description: string;
  value: number;
  type: "total" | "active" | "expired" | "suspended";
}) {
  const iconClass =
    type === "active"
      ? "bg-emerald-50 text-emerald-600"
      : type === "expired"
        ? "bg-red-50 text-red-600"
        : type === "suspended"
          ? "bg-amber-50 text-amber-600"
          : "bg-indigo-50 text-indigo-600";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>

          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <rect x="4" y="4" width="16" height="16" rx="2" />

            <path d="M8 8h8M8 12h8M8 16h5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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

function TableHeader({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function LicenseRow({
  license,
  onRenew,
  onSuspend,
  onActivate,
  isUpdating,
}: {
  license: License;
  onRenew: () => void;
  onSuspend: () => void;
  onActivate: () => void;
  isUpdating: boolean;
}) {
  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70">
      <td className="px-5 py-4">
        <p className="font-semibold text-slate-800">{license.licenseKey}</p>

        <p className="mt-1 text-xs text-slate-400">{license.renewalPeriod}</p>
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {license.organization}
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {license.licenseType}
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">{license.expiryDate}</td>

      <td className="px-5 py-4">
        <StatusBadge status={license.status} />
      </td>

      <td className="px-5 py-4">
        <div className="flex flex-wrap justify-end gap-2">
          <ActionButton
            label="Renew"
            onClick={onRenew}
            disabled={isUpdating}
            className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
          />

          {license.status === "Suspended" ? (
            <ActionButton
              label="Activate"
              onClick={onActivate}
              disabled={isUpdating}
              className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            />
          ) : (
            <ActionButton
              label="Suspend"
              onClick={onSuspend}
              disabled={isUpdating || license.status === "Expired"}
              className="bg-amber-50 text-amber-700 hover:bg-amber-100"
            />
          )}
        </div>
      </td>
    </tr>
  );
}

function LicenseCard({
  license,
  onRenew,
  onSuspend,
  onActivate,
  isUpdating,
}: {
  license: License;
  onRenew: () => void;
  onSuspend: () => void;
  onActivate: () => void;
  isUpdating: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-800">{license.licenseKey}</p>

          <p className="mt-1 text-sm text-slate-500">{license.organization}</p>
        </div>

        <StatusBadge status={license.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3 sm:grid-cols-3">
        <InfoItem label="Plan" value={license.licenseType} />

        <InfoItem label="Expiry" value={license.expiryDate} />

        <InfoItem label="Renewal" value={license.renewalPeriod} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <ActionButton
          label="Renew"
          onClick={onRenew}
          disabled={isUpdating}
          className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
        />

        {license.status === "Suspended" ? (
          <ActionButton
            label="Activate"
            onClick={onActivate}
            disabled={isUpdating}
            className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          />
        ) : (
          <ActionButton
            label="Suspend"
            onClick={onSuspend}
            disabled={isUpdating || license.status === "Expired"}
            className="bg-amber-50 text-amber-700 hover:bg-amber-100"
          />
        )}
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm text-slate-700">{value}</p>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  disabled,
  className,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: LicenseStatus }) {
  const statusClass =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Suspended"
        ? "bg-amber-50 text-amber-700"
        : status === "Expired"
          ? "bg-red-50 text-red-700"
          : "bg-blue-50 text-blue-700";

  const dotClass =
    status === "Active"
      ? "bg-emerald-500"
      : status === "Suspended"
        ? "bg-amber-500"
        : status === "Expired"
          ? "bg-red-500"
          : "bg-blue-500";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass}`} />
      {status}
    </span>
  );
}

export default LicenseManagement;
