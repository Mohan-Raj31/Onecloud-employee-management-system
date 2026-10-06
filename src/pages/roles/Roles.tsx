import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useRoles } from "../../hooks/useRoles";

import type {
  RoleStatus,
  RoleType,
} from "../../types";

import RoleCard from "../../components/roles/RoleCard";
import RoleSummaryCard from "../../components/roles/RoleSummaryCard";

function Roles() {
  const navigate = useNavigate();

  const {
    data: roles = [],
    isLoading,
    isError,
    refetch,
  } = useRoles();

  const [search, setSearch] = useState("");
  const [roleType, setRoleType] =
    useState<RoleType | "All">("All");
  const [status, setStatus] =
    useState<RoleStatus | "All">("All");

  const filteredRoles = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return roles.filter((role) => {
      const matchesSearch =
        !normalizedSearch ||
        role.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        role.code
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesType =
        roleType === "All" ||
        role.type === roleType;

      const matchesStatus =
        status === "All" ||
        role.status === status;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [roles, search, roleType, status]);

  const totalRoles = roles.length;

  const systemRoles = roles.filter(
    (role) => role.type === "System Role",
  ).length;

  const customRoles = roles.filter(
    (role) => role.type === "Custom Role",
  ).length;

  const activeRoles = roles.filter(
    (role) => role.status === "Active",
  ).length;

  const handleClear = () => {
    setSearch("");
    setRoleType("All");
    setStatus("All");
  };

  if (isLoading) {
    return <PageState title="Loading roles..." />;
  }

  if (isError) {
    return (
      <PageState
        title="Unable to load roles"
        actionLabel="Try Again"
        onAction={() => void refetch()}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-7">
      {/* PAGE HEADER */}
      <section className="flex items-start justify-between gap-4 max-[650px]:flex-col">
        <div>
          <h1 className="bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-[30px] font-extrabold tracking-[-1px] text-transparent max-[650px]:text-[23px] max-[400px]:text-[20px]">
            Roles Management
          </h1>

          <p className="mt-1 text-sm font-medium text-[#667085] max-[400px]:text-xs">
            Define roles, access levels and permissions
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/roles/create")
          }
          className="h-11 shrink-0 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 max-[650px]:w-full"
        >
          Create Role
        </button>
      </section>

      {/* ROLE SUMMARY */}
      <section>
        <h2 className="mb-4 text-2xl font-extrabold text-red-900 max-[650px]:text-[20px] max-[400px]:text-[18px]">
          Role Summary
        </h2>

        <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[500px]:grid-cols-1">
          <RoleSummaryCard
            title="Total Roles"
            value={totalRoles}
          />

          <RoleSummaryCard
            title="System Roles"
            value={systemRoles}
          />

          <RoleSummaryCard
            title="Custom Roles"
            value={customRoles}
          />

          <RoleSummaryCard
            title="Active Roles"
            value={activeRoles}
          />
        </div>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="rounded-[17px] border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.05)] max-[650px]:p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_200px_180px_auto] gap-3 max-[1100px]:grid-cols-2 max-[650px]:grid-cols-1">
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search role..."
            className="h-11 min-w-0 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />

          <select
            value={roleType}
            onChange={(event) =>
              setRoleType(
                event.target.value as
                  | RoleType
                  | "All",
              )
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 outline-none focus:border-indigo-400"
          >
            <option value="All">
              All Role Types
            </option>

            <option value="System Role">
              System Role
            </option>

            <option value="Business Role">
              Business Role
            </option>

            <option value="Default Role">
              Default Role
            </option>

            <option value="Custom Role">
              Custom Role
            </option>
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as
                  | RoleStatus
                  | "All",
              )
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 outline-none focus:border-indigo-400"
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
            onClick={handleClear}
            className="h-11 rounded-xl border border-indigo-200 bg-indigo-50 px-4 text-sm font-bold text-indigo-600 transition hover:bg-indigo-100 max-[1100px]:col-span-2 max-[650px]:col-span-1"
          >
            Clear
          </button>
        </div>
      </section>

      {/* ROLE DIRECTORY */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-red-900 max-[650px]:text-[20px] max-[400px]:text-[18px]">
              Role Directory
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-500">
              {filteredRoles.length} role
              {filteredRoles.length === 1
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

        <div className="space-y-3">
          {filteredRoles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              onView={() =>
                navigate(
                  `/roles/view/${role.id}`,
                )
              }
              onEdit={() =>
                navigate(
                  `/roles/edit/${role.id}`,
                )
              }
            />
          ))}

          {filteredRoles.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
              <p className="text-sm font-bold text-slate-700">
                No roles found
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Try changing the search or filters.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* BOTTOM ACTIONS */}
      <section className="flex justify-end gap-3 pb-6 max-[500px]:flex-col">
        <button
          type="button"
          onClick={() =>
            navigate("/roles/hierarchy")
          }
          className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-bold text-indigo-600 transition hover:bg-indigo-100"
        >
          View Hierarchy
        </button>

        <button
          type="button"
          onClick={() => void refetch()}
          className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Refresh
        </button>
      </section>
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

export default Roles;