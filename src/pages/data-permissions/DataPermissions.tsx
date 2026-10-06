import {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useDataPermissions,
} from "../../hooks/useDataPermissions";

import type {
  DataPermissionStatus,
  DataPermissionType,
} from "../../types";

function DataPermissions() {
  const navigate =
    useNavigate();

  const {
    data: policies = [],
    isLoading,
    isError,
    refetch,
  } = useDataPermissions();

  const [search, setSearch] =
    useState("");

  const [organization, setOrganization] =
    useState("All");

  const [role, setRole] =
    useState("All");

  const [status, setStatus] =
    useState<
      DataPermissionStatus | "All"
    >("All");

  const [type, setType] =
    useState<
      DataPermissionType | "All"
    >("All");

  const organizations = [
    ...new Set(
      policies.map(
        (item) =>
          item.organization,
      ),
    ),
  ];

  const roles = [
    ...new Set(
      policies.map(
        (item) => item.role,
      ),
    ),
  ];

  const filtered = useMemo(() => {
    const query =
      search
        .trim()
        .toLowerCase();

    return policies.filter(
      (item) => {
        const matchesSearch =
          !query ||
          item.policyName
            .toLowerCase()
            .includes(query) ||
          item.organization
            .toLowerCase()
            .includes(query) ||
          item.role
            .toLowerCase()
            .includes(query);

        const matchesOrganization =
          organization === "All" ||
          item.organization ===
            organization;

        const matchesRole =
          role === "All" ||
          item.role === role;

        const matchesStatus =
          status === "All" ||
          item.status === status;

        const matchesType =
          type === "All" ||
          item.policyType === type;

        return (
          matchesSearch &&
          matchesOrganization &&
          matchesRole &&
          matchesStatus &&
          matchesType
        );
      },
    );
  }, [
    policies,
    search,
    organization,
    role,
    status,
    type,
  ]);

  const clearFilters = () => {
    setSearch("");
    setOrganization("All");
    setRole("All");
    setStatus("All");
    setType("All");
  };

  if (isLoading) {
    return (
      <PageState
        title="Loading data permissions..."
      />
    );
  }

  if (isError) {
    return (
      <PageState
        title="Unable to load data permissions"
        actionLabel="Try Again"
        onAction={() =>
          void refetch()
        }
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-7">
      {/* HEADER */}
      <section className="flex items-start justify-between gap-4 max-[650px]:flex-col">
        <div>
          <h1 className="bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-[30px] font-extrabold tracking-[-1px] text-transparent max-[650px]:text-[23px]">
            Data Permissions
          </h1>

          <p className="mt-1 text-sm font-medium text-[#667085]">
            Define and manage
            data-level access
            policies
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/data-permissions/create",
            )
          }
          className="h-11 shrink-0 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 max-[650px]:w-full"
        >
          Create Policy
        </button>
      </section>

      {/* SUMMARY */}
      <section>
        <h2 className="mb-4 text-2xl font-extrabold text-red-900">
          Data Permission Summary
        </h2>

        <div className="grid grid-cols-3 gap-4 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1">
          <Summary
            title="Total Policies"
            value={policies.length}
          />

          <Summary
            title="Active"
            value={
              policies.filter(
                (policy) =>
                  policy.status ===
                  "Active",
              ).length
            }
          />

          <Summary
            title="Inactive"
            value={
              policies.filter(
                (policy) =>
                  policy.status ===
                  "Inactive",
              ).length
            }
          />
        </div>
      </section>

      {/* FILTERS */}
      <section className="rounded-[17px] border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.05)]">
        <div className="grid grid-cols-[minmax(0,1fr)_190px_180px_160px_170px_auto] gap-3 max-[1200px]:grid-cols-2 max-[650px]:grid-cols-1">
          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value,
              )
            }
            placeholder="Search policy..."
            className="h-[46px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />

          <select
            value={organization}
            onChange={(event) =>
              setOrganization(
                event.target.value,
              )
            }
            className="h-[46px] rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="All">
              All Organizations
            </option>

            {organizations.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ),
            )}
          </select>

          <select
            value={role}
            onChange={(event) =>
              setRole(
                event.target.value,
              )
            }
            className="h-[46px] rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="All">
              All Roles
            </option>

            {roles.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ),
            )}
          </select>

          <select
            value={type}
            onChange={(event) =>
              setType(
                event.target
                  .value as
                  | DataPermissionType
                  | "All",
              )
            }
            className="h-[46px] rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="All">
              All Types
            </option>

            {dataPermissionTypes.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ),
            )}
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target
                  .value as
                  | DataPermissionStatus
                  | "All",
              )
            }
            className="h-[46px] rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          <button
            type="button"
            onClick={clearFilters}
            className="h-[46px] rounded-xl border border-indigo-200 bg-indigo-50 px-4 text-sm font-bold text-indigo-600 hover:bg-indigo-100"
          >
            Clear
          </button>
        </div>
      </section>

      {/* DIRECTORY */}
      <section className="rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_25px_rgba(15,23,42,0.05)]">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-xl font-extrabold text-red-900">
              Data Permission
              Directory
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filtered.length}{" "}
              {filtered.length ===
              1
                ? "policy"
                : "policies"}{" "}
              shown
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              void refetch()
            }
            className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
          >
            Refresh
          </button>
        </div>

        {/* DESKTOP */}
        <div className="hidden min-[1040px]:block">
          <table className="w-full table-fixed text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">
                <th className="w-[24%] px-5 py-4">
                  Policy
                </th>

                <th className="w-[16%] px-5 py-4">
                  Organization
                </th>

                <th className="w-[14%] px-5 py-4">
                  Role
                </th>

                <th className="w-[14%] px-5 py-4">
                  Data Scope
                </th>

                <th className="w-[10%] px-5 py-4">
                  Status
                </th>

                <th className="w-[12%] px-5 py-4">
                  Created
                </th>

                <th className="w-[10%] px-5 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(
                (policy) => (
                  <tr
                    key={policy.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <p className="truncate text-sm font-extrabold text-slate-800">
                        {policy.policyName}
                      </p>

                      <p className="mt-1 truncate text-[11px] font-bold text-slate-400">
                        {policy.policyType}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                      {
                        policy.organization
                      }
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                      {policy.role}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {policy.dataScopes
                          .slice(
                            0,
                            2,
                          )
                          .map(
                            (scope) => (
                              <span
                                key={
                                  scope
                                }
                                className="rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-bold text-indigo-600"
                              >
                                {scope}
                              </span>
                            ),
                          )}

                        {policy
                          .dataScopes
                          .length >
                          2 && (
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
                            +
                            {policy
                              .dataScopes
                              .length -
                              2}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <Status
                        value={
                          policy.status
                        }
                      />
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-600">
                      {
                        policy.createdAt
                      }
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/data-permissions/view/${policy.id}`,
                            )
                          }
                          className="rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/data-permissions/edit/${policy.id}`,
                            )
                          }
                          className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE / TABLET */}
        <div className="grid gap-3 p-3 min-[1040px]:hidden">
          {filtered.map(
            (policy) => (
              <article
                key={policy.id}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-slate-800">
                      {
                        policy.policyName
                      }
                    </p>

                    <p className="mt-1 text-[11px] font-bold text-slate-400">
                      {
                        policy.policyType
                      }
                    </p>
                  </div>

                  <Status
                    value={
                      policy.status
                    }
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 max-[500px]:grid-cols-1">
                  <Info
                    label="Organization"
                    value={
                      policy.organization
                    }
                  />

                  <Info
                    label="Role"
                    value={
                      policy.role
                    }
                  />

                  <Info
                    label="Data Scope"
                    value={policy.dataScopes.join(
                      ", ",
                    )}
                  />

                  <Info
                    label="Created"
                    value={
                      policy.createdAt
                    }
                  />
                </div>

                <div className="mt-4 flex justify-end gap-2 border-t border-slate-200 pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/data-permissions/view/${policy.id}`,
                      )
                    }
                    className="rounded-lg bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-600"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/data-permissions/edit/${policy.id}`,
                      )
                    }
                    className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-600"
                  >
                    Edit
                  </button>
                </div>
              </article>
            ),
          )}
        </div>

        {filtered.length ===
          0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-bold text-slate-700">
              No data permission
              policies found
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Try changing your
              search or filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

const dataPermissionTypes: DataPermissionType[] =
  [
    "Organization-Based",
    "Business Unit-Based",
    "Department-Based",
    "Branch-Based",
    "Project-Based",
    "Location-Based",
  ];

function Summary({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-wide text-slate-400">
        {title}
      </p>

      <p className="mt-2 text-3xl font-extrabold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function Status({
  value,
}: {
  value: DataPermissionStatus;
}) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
        value === "Active"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-rose-50 text-rose-700"
      }`}
    >
      {value}
    </span>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function PageState({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="font-extrabold text-slate-800">
          {title}
        </p>

        {actionLabel &&
          onAction && (
            <button
              type="button"
              onClick={onAction}
              className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white"
            >
              {actionLabel}
            </button>
          )}
      </div>
    </div>
  );
}

export default DataPermissions;
