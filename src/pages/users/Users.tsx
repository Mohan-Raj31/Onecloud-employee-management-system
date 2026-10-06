import { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useUsers } from "../../hooks/useUsers";

import type { UserRole, UserStatus } from "../../types";

function Users() {
  const navigate = useNavigate();

  const { data: users = [], isLoading, isError, refetch } = useUsers();

  const [search, setSearch] = useState("");

  const [organization, setOrganization] = useState("All");

  const [role, setRole] = useState<UserRole | "All">("All");

  const [status, setStatus] = useState<UserStatus | "All">("All");

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`;

      const matchesSearch =
        !normalizedSearch ||
        fullName.toLowerCase().includes(normalizedSearch) ||
        user.username.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch) ||
        user.employeeId.toLowerCase().includes(normalizedSearch);

      const matchesOrganization =
        organization === "All" || user.organization === organization;

      const matchesRole = role === "All" || user.role === role;

      const matchesStatus = status === "All" || user.status === status;

      return (
        matchesSearch && matchesOrganization && matchesRole && matchesStatus
      );
    });
  }, [users, search, organization, role, status]);

  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.status === "Active").length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive",
  ).length;

  const pendingUsers = users.filter((user) => user.status === "Pending").length;

  const organizations = [
    "All",
    ...Array.from(new Set(users.map((user) => user.organization))),
  ];

  const handleRefresh = async () => {
    await refetch();
  };

  if (isLoading) {
    return <PageState title="Loading users..." />;
  }

  if (isError) {
    return (
      <PageState
        title="Unable to load users"
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
            Users Management
          </h1>

          <p className="mt-1 text-sm font-medium text-[#667085] max-[400px]:text-xs">
            Manage and monitor platform users
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/users/create")}
          className="h-11 shrink-0 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 max-[650px]:w-full"
        >
          Create User
        </button>
      </section>

      {/* USER OVERVIEW */}
      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-extrabold text-red-900 max-[650px]:text-[20px] max-[400px]:text-[18px]">
            User Overview
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-4 max-[1000px]:grid-cols-2 max-[500px]:grid-cols-1">
          <OverviewCard title="Total Users" value={totalUsers} />

          <OverviewCard title="Active Users" value={activeUsers} />

          <OverviewCard title="Inactive" value={inactiveUsers} />

          <OverviewCard title="Pending" value={pendingUsers} />
        </div>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="rounded-[17px] border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.05)] max-[650px]:p-4">
        <div className="grid grid-cols-[minmax(0,1fr)_180px_180px_180px_auto] gap-3 max-[1100px]:grid-cols-2 max-[650px]:grid-cols-1">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            className="h-11 min-w-0 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />

          <select
            value={organization}
            onChange={(event) => setOrganization(event.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 outline-none focus:border-indigo-400"
          >
            {organizations.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Organizations" : item}
              </option>
            ))}
          </select>

          <select
            value={role}
            onChange={(event) =>
              setRole(event.target.value as UserRole | "All")
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 outline-none focus:border-indigo-400"
          >
            <option value="All">All Roles</option>
            <option value="System Admin">System Admin</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as UserStatus | "All")
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 outline-none focus:border-indigo-400"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setOrganization("All");
              setRole("All");
              setStatus("All");
            }}
            className="h-11 rounded-xl border border-indigo-200 bg-indigo-50 px-4 text-sm font-bold text-indigo-600 transition hover:bg-indigo-100 max-[1100px]:col-span-2 max-[650px]:col-span-1"
          >
            Clear
          </button>
        </div>
      </section>

      {/* RECENT USERS */}
      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-red-900 max-[650px]:text-[20px] max-[400px]:text-[18px]">
              Recent Users
            </h2>

            <p className="mt-1 text-xs font-medium text-slate-500">
              {filteredUsers.length} user
              {filteredUsers.length === 1 ? "" : "s"} shown
            </p>
          </div>

          <button
            type="button"
            onClick={() => void handleRefresh()}
            className="text-sm font-bold text-indigo-600 hover:text-indigo-800"
          >
            Refresh
          </button>
        </div>

        <div className="overflow-hidden rounded-[17px] border border-[#e5e7eb] bg-white shadow-[0_8px_25px_rgba(15,23,42,0.05)]">
          {/* MOBILE + TABLET */}
          <div className="grid gap-3 p-4 xl:hidden">
            {filteredUsers.map((user) => (
              <article
                key={user.id}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <button
                      type="button"
                      onClick={() => navigate(`/users/${user.id}`)}
                      className="truncate text-left text-sm font-extrabold text-slate-800 hover:text-indigo-600"
                    >
                      {user.firstName} {user.lastName}
                    </button>

                    <p className="mt-1 text-xs font-bold text-slate-400">
                      {user.username}
                    </p>
                  </div>

                  <StatusBadge status={user.status} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <MobileDetail label="Email" value={user.email} />

                  <MobileDetail
                    label="Organization"
                    value={user.organization}
                  />

                  <MobileDetail label="Role" value={user.role} />

                  <MobileDetail label="Employee ID" value={user.employeeId} />
                </div>

                <div className="mt-4 flex justify-end gap-2 border-t border-slate-200 pt-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/users/view/${user.id}`)}
                    className="rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(`/users/edit/${user.id}`)}
                    className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Edit
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden overflow-x-auto xl:block">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-[0.04em] text-slate-500">
                  <th className="px-5 py-4">Name</th>

                  <th className="px-5 py-4">Username</th>

                  <th className="px-5 py-4">Email</th>

                  <th className="px-5 py-4">Organization</th>

                  <th className="px-5 py-4">Role</th>

                  <th className="px-5 py-4">Status</th>

                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => navigate(`/users/${user.id}`)}
                        className="text-sm font-extrabold text-slate-800 hover:text-indigo-600"
                      >
                        {user.firstName} {user.lastName}
                      </button>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {user.employeeId}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                      {user.username}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {user.email}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {user.organization}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {user.role}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={user.status} />
                    </td>

                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/users/view/${user.id}`)}
                          className="rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate(`/users/edit/${user.id}`)}
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

          {filteredUsers.length === 0 && (
            <div className="px-6 py-12 text-center">
              <p className="text-sm font-bold text-slate-700">No users found</p>

              <p className="mt-1 text-xs text-slate-500">
                Try changing the search or filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function OverviewCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-[17px] border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.05)]">
      <p className="text-sm font-bold text-slate-500">{title}</p>

      <p className="mt-3 text-[28px] font-extrabold text-slate-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  const styles =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : status === "Inactive"
        ? "bg-rose-50 text-rose-700"
        : "bg-amber-50 text-amber-700";

  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${styles}`}
    >
      {status}
    </span>
  );
}

function MobileDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-bold text-slate-700">{value}</p>
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
        <p className="font-extrabold text-slate-800">{title}</p>

        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

export default Users;
