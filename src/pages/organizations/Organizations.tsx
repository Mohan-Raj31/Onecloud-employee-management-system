import { useNavigate } from "react-router-dom";
import { useMemo, useRef, useState, type ChangeEvent } from "react";

import OrganizationManagementCard from "../../components/organizations/OrganizationManagementCard";
import OrganizationOverviewCard from "../../components/organizations/OrganizationOverviewCard";

import {
  organizationFilterOptions,
  organizationLocations,
  organizationManagementCards,
  organizationOverviewCards,
} from "../../data/organizations";

import { useOrganizations } from "../../hooks/useOrganizations";

function OrganizationIcon({ type }: { type: string }) {
  const common = "h-[20px] w-[20px]";

  if (type === "company" || type === "companies") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
      >
        <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
        <path d="M2 21h20M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3" />
      </svg>
    );
  }

  if (type === "businessUnits") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
      >
        <rect x="3" y="4" width="7" height="7" rx="1.5" />
        <rect x="14" y="4" width="7" height="7" rx="1.5" />
        <rect x="8.5" y="14" width="7" height="7" rx="1.5" />
        <path d="M6.5 11v1.5h11V11M12 12.5V14" />
      </svg>
    );
  }

  if (type === "departments") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
      >
        <circle cx="12" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M12 9v4M9.5 14.5 8 16M14.5 14.5 16 16" />
      </svg>
    );
  }

  if (type === "branches") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
      >
        <path d="M12 21V5M12 8H6M12 13h6M6 8v4M18 13v4" />
        <circle cx="12" cy="4" r="2" />
        <circle cx="6" cy="14" r="2" />
        <circle cx="18" cy="19" r="2" />
      </svg>
    );
  }

  if (type === "costCentres") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={common}
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M15 9.5c-.7-.8-1.7-1.2-3-1.2-1.8 0-3 .9-3 2.2s1.2 2 3 2.2c1.8.2 3 .9 3 2.2s-1.2 2.2-3 2.2c-1.3 0-2.4-.4-3.1-1.2M12 6.8v10.4" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={common}
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function Organizations() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isError, refetch } = useOrganizations();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [businessType, setBusinessType] = useState("All");
  const [location, setLocation] = useState("All");
  const [message, setMessage] = useState("");

  const filteredOrganizations = useMemo(() => {
    const organizations = data?.organizations ?? [];
    const normalizedSearch = search.trim().toLowerCase();

    return organizations.filter((organization) => {
      const matchesSearch =
        !normalizedSearch ||
        organization.name.toLowerCase().includes(normalizedSearch) ||
        organization.code.toLowerCase().includes(normalizedSearch);

      const matchesStatus = status === "All" || organization.status === status;

      const matchesBusinessType =
        businessType === "All" || organization.businessType === businessType;

      const matchesLocation =
        location === "All" || organization.location === location;

      return (
        matchesSearch && matchesStatus && matchesBusinessType && matchesLocation
      );
    });
  }, [data?.organizations, search, status, businessType, location]);

  const handleRefresh = async () => {
    setMessage("");
    await refetch();
  };

  const handleExport = () => {
    const rows = filteredOrganizations.map((organization) =>
      [
        organization.name,
        organization.code,
        organization.businessType,
        organization.location,
        organization.status,
        organization.createdAt,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(","),
    );

    const csv = [
      "Company Name,Company Code,Business Type,Location,Status,Created On",
      ...rows,
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "organizations.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleImport = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setMessage(
      `${file.name} selected. Import is ready for backend integration.`,
    );

    event.target.value = "";
  };

  const handleCreateCompany = () => {
    navigate("/organizations/create");
  };

  const handleViewReports = () => {
    setMessage(
      `Organization reports are ready for the reports module. Current records: ${filteredOrganizations.length}.`,
    );
  };

  if (isLoading) {
    return <OrganizationPageState title="Loading organizations..." />;
  }

  if (isError || !data) {
    return (
      <OrganizationPageState
        title="Unable to load organizations"
        actionLabel="Try Again"
        onAction={() => void refetch()}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-7">
      {/* PAGE HEADER */}
      <section>
        <h1 className="bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-[30px] font-extrabold tracking-[-1px] text-transparent max-[650px]:text-[23px] max-[400px]:text-[20px]">
          Organization Management
        </h1>

        <p className="text-sm font-medium text-[#667085] max-[400px]:text-xs">
          Welcome, Super Administrator
        </p>
      </section>

      {/* ORGANIZATION OVERVIEW */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-extrabold text-red-900 max-[650px]:text-[20px] max-[400px]:text-[18px]">
            Organization Overview
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Company and organizational structure summary
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {organizationOverviewCards.map((card) => (
            <OrganizationOverviewCard
              key={card.key}
              label={card.label}
              value={data.stats[card.key]}
              description={card.description}
              icon={<OrganizationIcon type={card.key} />}
            />
          ))}
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-extrabold text-red-900 max-[650px]:text-[20px] max-[400px]:text-[18px]">
            Quick Actions
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCreateCompany}
            className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 max-[500px]:w-full"
          >
            + Create Company
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 max-[500px]:flex-1"
          >
            Import
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 max-[500px]:flex-1"
          >
            Export
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.json"
            className="hidden"
            onChange={handleImport}
          />
        </div>
      </section>

      {/* ORGANIZATION MANAGEMENT */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-extrabold text-red-900 max-[650px]:text-[20px] max-[400px]:text-[18px]">
            Organization Management
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Organization structure and administration areas
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {organizationManagementCards.map((card) => (
            <OrganizationManagementCard
              key={card.key}
              label={card.label}
              description={card.description}
              icon={<OrganizationIcon type={card.key} />}
            />
          ))}
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-extrabold text-red-900 max-[650px]:text-[20px] max-[400px]:text-[18px]">
            Search &amp; Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(150px,0.6fr))]">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search organizations or company code..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none shadow-sm transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none shadow-sm focus:border-indigo-400"
          >
            {organizationFilterOptions.statuses.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          <select
            value={businessType}
            onChange={(event) => setBusinessType(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none shadow-sm focus:border-indigo-400"
          >
            {organizationFilterOptions.businessTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>

          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none shadow-sm focus:border-indigo-400"
          >
            {organizationLocations.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </section>

      {/* RECENT ORGANIZATIONS */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-extrabold text-red-900 max-[650px]:text-[20px] max-[400px]:text-[18px]">
            Recent Organizations
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500">
            {filteredOrganizations.length} organization
            {filteredOrganizations.length === 1 ? "" : "s"} shown
          </p>
        </div>

        <div className="overflow-hidden rounded-[17px] border border-[#e5e7eb] bg-white shadow-[0_8px_25px_rgba(15,23,42,0.05)]">
          {/* MOBILE + TABLET */}
          <div className="grid gap-3 p-4 xl:hidden">
            {filteredOrganizations.map((organization) => (
              <article
                key={organization.id}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/organizations/${organization.id}`)
                      }
                      className="truncate text-left text-sm font-extrabold text-slate-800 hover:text-indigo-600"
                    >
                      {organization.name}
                    </button>

                    <p className="mt-1 text-xs font-bold text-slate-400">
                      {organization.code}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                      organization.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {organization.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <MobileDetail
                    label="Business Type"
                    value={organization.businessType}
                  />

                  <MobileDetail
                    label="Location"
                    value={organization.location}
                  />

                  <MobileDetail
                    label="Created On"
                    value={organization.createdAt}
                  />

                  <MobileDetail label="Code" value={organization.code} />
                </div>

                <div className="mt-4 flex justify-end gap-2 border-t border-slate-200 pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/organizations/${organization.id}`)
                    }
                    className="rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/organizations/${organization.id}/edit`)
                    }
                    className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Edit
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden overflow-x-auto xl:block">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-[0.04em] text-slate-500">
                  <th className="px-5 py-4">Company Name</th>

                  <th className="px-5 py-4">Code</th>

                  <th className="px-5 py-4">Business Type</th>

                  <th className="px-5 py-4">Location</th>

                  <th className="px-5 py-4">Status</th>

                  <th className="px-5 py-4">Created On</th>

                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrganizations.map((organization) => (
                  <tr
                    key={organization.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4 text-sm font-extrabold text-slate-800">
                      {organization.name}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                      {organization.code}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {organization.businessType}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {organization.location}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                          organization.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {organization.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-500">
                      {organization.createdAt}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/organizations/${organization.id}`)
                          }
                          className="rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/organizations/${organization.id}/edit`)
                          }
                          className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EMPTY STATE */}
          {filteredOrganizations.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-bold text-slate-700">
                No organizations found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Try changing the search or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {message && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700">
          {message}
        </div>
      )}

      {/* LAST ACTIONS */}
      <section className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          onClick={handleViewReports}
          className="h-11 rounded-xl border border-indigo-200 bg-white px-5 text-sm font-bold text-indigo-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-50"
        >
          View Reports
        </button>

        <button
          type="button"
          onClick={() => void handleRefresh()}
          className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5"
        >
          Refresh
        </button>
      </section>
    </div>
  );
}

function OrganizationPageState({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[500px] w-full max-w-[1500px] items-center justify-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

        <h2 className="text-lg font-extrabold text-slate-800">{title}</h2>

        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="mt-5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

function MobileDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-bold text-slate-700">
        {value}
      </p>
    </div>
  );
}

export default Organizations;
