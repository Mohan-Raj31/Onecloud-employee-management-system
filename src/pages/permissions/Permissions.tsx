import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePermissions } from "../../hooks/usePermissions";

import type {
  PermissionStatus,
  PermissionType,
} from "../../types";

function Permissions() {
  const navigate = useNavigate();

  const {
    data: permissions = [],
    isLoading,
    isError,
    refetch,
  } = usePermissions();

  const [search, setSearch] = useState("");
  const [module, setModule] = useState("All");

  const [type, setType] =
    useState<PermissionType | "All">("All");

  const [status, setStatus] =
    useState<PermissionStatus | "All">("All");

  const modules = [
    "User Management",
    "Organization Management",
    "Employee Management",
    "Reports",
    "Settings",
    "Roles Management",
    "Permissions",
    "Audit Logs",
  ];

  const filteredPermissions = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return permissions.filter((permission) => {
      const matchesSearch =
        !normalizedSearch ||
        permission.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        permission.code
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesModule =
        module === "All" ||
        permission.module === module;

      const matchesType =
        type === "All" ||
        permission.type === type;

      const matchesStatus =
        status === "All" ||
        permission.status === status;

      return (
        matchesSearch &&
        matchesModule &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    permissions,
    search,
    module,
    type,
    status,
  ]);

  const activeCount = permissions.filter(
    (permission) =>
      permission.status === "Active",
  ).length;

  const inactiveCount =
    permissions.length - activeCount;

  const handleClear = () => {
    setSearch("");
    setModule("All");
    setType("All");
    setStatus("All");
  };

  if (isLoading) {
    return (
      <PageState title="Loading permissions..." />
    );
  }

  if (isError) {
    return (
      <PageState
        title="Unable to load permissions"
        actionLabel="Try Again"
        onAction={() => void refetch()}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-7">

      {/* HEADER */}
      <section className="flex items-start justify-between gap-4 max-[650px]:flex-col">
        <div>
          <h1 className="bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-[30px] font-extrabold tracking-[-1px] text-transparent max-[650px]:text-[23px]">
            Permissions Management
          </h1>

          <p className="mt-1 text-sm font-medium text-[#667085]">
            Define and manage action-level access permissions
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/permissions/create")
          }
          className="h-11 shrink-0 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 max-[650px]:w-full"
        >
          Create Permission
        </button>
      </section>

      {/* SUMMARY */}
      <section>
        <h2 className="mb-4 text-2xl font-extrabold text-red-900">
          Permission Summary
        </h2>

        <div className="grid grid-cols-3 gap-4 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1">
          <SummaryCard
            title="Total Permissions"
            value={permissions.length}
          />

          <SummaryCard
            title="Active"
            value={activeCount}
          />

          <SummaryCard
            title="Inactive"
            value={inactiveCount}
          />
        </div>
      </section>

      {/* FILTERS */}
      <section className="rounded-[17px] border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.05)]">
        <div className="grid grid-cols-[minmax(0,1fr)_210px_180px_160px_auto] gap-3 max-[1200px]:grid-cols-2 max-[650px]:grid-cols-1">

          {/* SEARCH */}
          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search permission..."
            className="h-[46px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />

          {/* MODULE */}
          <select
            value={module}
            onChange={(event) =>
              setModule(event.target.value)
            }
            className="h-[46px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="All">
              All Modules
            </option>

            {modules.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>

          {/* TYPE */}
          <select
            value={type}
            onChange={(event) =>
              setType(
                event.target.value as
                  | PermissionType
                  | "All",
              )
            }
            className="h-[46px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="All">
              All Types
            </option>

            <option value="CRUD">
              CRUD
            </option>

            <option value="Approval">
              Approval
            </option>

            <option value="Import / Export">
              Import / Export
            </option>

            <option value="Read Only">
              Read Only
            </option>

            <option value="Custom">
              Custom
            </option>
          </select>

          {/* STATUS */}
          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | PermissionStatus
                  | "All",
              )
            }
            className="h-[46px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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

          {/* CLEAR */}
          <button
            type="button"
            onClick={handleClear}
            className="h-[46px] rounded-xl border border-indigo-200 bg-indigo-50 px-4 text-sm font-bold text-indigo-600 transition hover:bg-indigo-100"
          >
            Clear
          </button>
        </div>
      </section>

      {/* PERMISSION DIRECTORY */}
      <section className="rounded-2xl border border-[#e5e7eb] bg-white shadow-[0_8px_25px_rgba(15,23,42,0.05)]">

        {/* DIRECTORY HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-xl font-extrabold text-red-900">
              Permission Directory
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              {filteredPermissions.length} permission
              {filteredPermissions.length === 1
                ? ""
                : "s"} shown
            </p>
          </div>

          <button
            type="button"
            onClick={() => void refetch()}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
          >
            Refresh
          </button>
        </div>

        {/* =====================================================
            DESKTOP TABLE
            1040px AND ABOVE
            ===================================================== */}

        <div className="hidden min-[1040px]:block">
          <table className="w-full table-fixed text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wide text-slate-500">

                <th className="w-[20%] px-5 py-4">
                  Permission
                </th>

                <th className="w-[18%] px-5 py-4">
                  Module
                </th>

                <th className="w-[12%] px-5 py-4">
                  Type
                </th>

                <th className="w-[20%] px-5 py-4">
                  Actions
                </th>

                <th className="w-[8%] px-5 py-4">
                  Roles
                </th>

                <th className="w-[10%] px-5 py-4">
                  Status
                </th>

                <th className="w-[12%] px-5 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPermissions.map(
                (permission) => (
                  <tr
                    key={permission.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >
                    {/* PERMISSION */}
                    <td className="px-5 py-4">
                      <p className="truncate text-sm font-extrabold text-slate-800">
                        {permission.name}
                      </p>

                      <p className="mt-1 truncate text-[11px] font-bold tracking-wide text-slate-400">
                        {permission.code}
                      </p>
                    </td>

                    {/* MODULE */}
                    <td className="px-5 py-4">
                      <p className="truncate text-sm font-semibold text-slate-600">
                        {permission.module}
                      </p>
                    </td>

                    {/* TYPE */}
                    <td className="px-5 py-4">
                      <span className="inline-block max-w-full truncate rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600">
                        {permission.type}
                      </span>
                    </td>

                    {/* PERMISSION ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {permission.actions
                          .slice(0, 3)
                          .map((action) => (
                            <span
                              key={action}
                              className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600"
                            >
                              {action}
                            </span>
                          ))}

                        {permission.actions.length >
                          3 && (
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
                            +
                            {permission.actions.length -
                              3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* ROLES */}
                    <td className="px-5 py-4 text-sm font-bold text-slate-700">
                      {permission.assignedRoles}
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                          permission.status ===
                          "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-rose-50 text-rose-700"
                        }`}
                      >
                        {permission.status}
                      </span>
                    </td>

                    {/* PAGE ACTIONS */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/permissions/view/${permission.id}`,
                            )
                          }
                          className="rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-600 transition hover:bg-indigo-50"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/permissions/edit/${permission.id}`,
                            )
                          }
                          className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
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

        {/* =====================================================
            TABLET + MOBILE CARDS
            BELOW 1040px
            ===================================================== */}

        <div className="grid gap-3 p-3 min-[1040px]:hidden">
          {filteredPermissions.map(
            (permission) => (
              <article
                key={permission.id}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-slate-800">
                      {permission.name}
                    </p>

                    <p className="mt-1 text-[11px] font-bold tracking-wide text-slate-400">
                      {permission.code}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${
                      permission.status ===
                      "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {permission.status}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="mt-4 grid grid-cols-2 gap-3 max-[500px]:grid-cols-1">

                  {/* MODULE */}
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                      Module
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {permission.module}
                    </p>
                  </div>

                  {/* TYPE */}
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                      Type
                    </p>

                    <span className="mt-1 inline-block rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600">
                      {permission.type}
                    </span>
                  </div>

                  {/* ROLES */}
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                      Roles
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {permission.assignedRoles}
                    </p>
                  </div>

                  {/* PERMISSION ACTIONS */}
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                      Permission Actions
                    </p>

                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {permission.actions
                        .slice(0, 4)
                        .map((action) => (
                          <span
                            key={action}
                            className="rounded-md bg-white px-2 py-1 text-[10px] font-bold text-slate-600"
                          >
                            {action}
                          </span>
                        ))}

                      {permission.actions.length >
                        4 && (
                        <span className="rounded-md bg-white px-2 py-1 text-[10px] font-bold text-slate-500">
                          +
                          {permission.actions.length -
                            4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="mt-4 flex justify-end gap-2 border-t border-slate-200 pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/permissions/view/${permission.id}`,
                      )
                    }
                    className="rounded-lg bg-indigo-50 px-4 py-2 text-xs font-bold text-indigo-600 transition hover:bg-indigo-100"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/permissions/edit/${permission.id}`,
                      )
                    }
                    className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
                  >
                    Edit
                  </button>
                </div>
              </article>
            ),
          )}
        </div>

        {/* EMPTY STATE */}
        {filteredPermissions.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-bold text-slate-700">
              No permissions found
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function SummaryCard({
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

        {actionLabel && onAction && (
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

export default Permissions;