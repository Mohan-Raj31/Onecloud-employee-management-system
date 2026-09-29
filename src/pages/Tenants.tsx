import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TenantStatusBadge from "../components/tenant-management/TenantStatusBadge";
import {
  useActivateTenant,
  useDeactivateTenant,
  useDeleteTenant,
  useTenants,
} from "../hooks/useTenants";
import type { SubscriptionPlan, TenantStatus } from "../types";

const pageSize = 8;

type SortBy = "name" | "users" | "createdAt" | "status";

function Tenants() {
  const navigate = useNavigate();
  const { data: tenants = [], isLoading, isError, refetch } = useTenants();
  const activateMutation = useActivateTenant();
  const deactivateMutation = useDeactivateTenant();
  const deleteMutation = useDeleteTenant();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<TenantStatus | "All">("All");
  const [plan, setPlan] = useState<SubscriptionPlan | "All">("All");
  const [sortBy, setSortBy] = useState<SortBy>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const filteredTenants = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    const result = tenants.filter((tenant) => {
      const matchesSearch =
        !normalized ||
        tenant.name.toLowerCase().includes(normalized) ||
        tenant.code.toLowerCase().includes(normalized);

      const matchesStatus = status === "All" || tenant.status === status;
      const matchesPlan = plan === "All" || tenant.subscription === plan;

      return matchesSearch && matchesStatus && matchesPlan;
    });

    return [...result].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "name") comparison = a.name.localeCompare(b.name);
      if (sortBy === "users") comparison = a.users - b.users;
      if (sortBy === "createdAt") {
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "status") comparison = a.status.localeCompare(b.status);

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [tenants, search, status, plan, sortBy, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredTenants.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filteredTenants.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleSort = (field: SortBy) => {
    if (sortBy === field) {
      setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }

    setPage(1);
  };

  const handleStatusChange = async (
    id: number,
    nextStatus: TenantStatus,
  ) => {
    if (nextStatus === "Active") {
      await activateMutation.mutateAsync(id);
    } else {
      await deactivateMutation.mutateAsync(id);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(id);

      if (currentPage > 1 && pageItems.length === 1) {
        setPage((value) => Math.max(1, value - 1));
      }
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Unable to delete tenant.",
      );
    }
  };

  const isMutating =
    activateMutation.isPending ||
    deactivateMutation.isPending ||
    deleteMutation.isPending;

  if (isLoading) return <PageState title="Loading tenants..." />;

  if (isError) {
    return (
      <PageState
        title="Unable to load tenants"
        description="The tenant service could not be loaded."
        actionLabel="Try Again"
        onAction={() => void refetch()}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="mt-1 bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent max-[650px]:text-[25px] max-[400px]:text-[22px]">
            Tenant Management
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Manage organizations, subscriptions, access and tenant configuration.
          </p>
        </div>

        <button
          onClick={() => navigate("/tenants/new")}
          className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 max-[650px]:w-full"
        >
          + Create Tenant
        </button>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)] sm:p-5">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px]">
          <label className="relative block">
            <span className="sr-only">Search tenant</span>
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search by tenant name or code..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </label>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value as TenantStatus | "All");
              setPage(1);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={plan}
            onChange={(event) => {
              setPlan(event.target.value as SubscriptionPlan | "All");
              setPage(1);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 outline-none focus:border-indigo-500"
          >
            <option value="All">All Plans</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Pro">Pro</option>
            <option value="Basic">Basic</option>
          </select>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              All Tenants
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {filteredTenants.length} matching tenants
            </p>
          </div>

          <button
            onClick={() => {
              setSearch("");
              setStatus("All");
              setPlan("All");
              setPage(1);
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            Clear filters
          </button>
        </div>

        {pageItems.length === 0 ? (
          <div className="p-12 text-center">
            <p className="font-bold text-slate-700">No tenants found</p>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-3 p-4 xl:hidden">
              {pageItems.map((tenant) => (
                <article
                  key={tenant.id}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <button
                        onClick={() => navigate(`/tenants/${tenant.id}`)}
                        className="truncate text-left text-sm font-extrabold text-slate-800 hover:text-indigo-600"
                      >
                        {tenant.name}
                      </button>
                      <p className="mt-1 text-xs font-bold text-slate-400">
                        {tenant.code}
                      </p>
                    </div>
                    <TenantStatusBadge status={tenant.status} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <MobileDetail label="Admin" value={tenant.adminName} />
                    <MobileDetail label="Plan" value={tenant.subscription} />
                    <MobileDetail
                      label="Users"
                      value={tenant.users.toLocaleString()}
                    />
                    <MobileDetail
                      label="Created"
                      value={new Date(tenant.createdAt).toLocaleDateString(
                        undefined,
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-200 pt-3">
                    <button
                      onClick={() => navigate(`/tenants/${tenant.id}`)}
                      className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/tenants/${tenant.id}/edit`)}
                      className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-600 ring-1 ring-slate-200"
                    >
                      Edit
                    </button>
                    <button
                      disabled={isMutating}
                      onClick={() =>
                        void handleStatusChange(
                          tenant.id,
                          tenant.status === "Active" ? "Inactive" : "Active",
                        )
                      }
                      className={`rounded-lg bg-white px-3 py-2 text-xs font-bold ring-1 ring-slate-200 disabled:opacity-40 ${
                        tenant.status === "Active"
                          ? "text-rose-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {tenant.status === "Active" ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      disabled={isMutating}
                      onClick={() => void handleDelete(tenant.id, tenant.name)}
                      className="rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-500 ring-1 ring-slate-200 disabled:opacity-40"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="hidden overflow-hidden xl:block">
              <table className="w-full min-w-[1120px] table-fixed text-left">
                <colgroup>
                  <col className="w-[16%]" />
                  <col className="w-[8%]" />
                  <col className="w-[17%]" />
                  <col className="w-[8%]" />
                  <col className="w-[7%]" />
                  <col className="w-[11%]" />
                  <col className="w-[11%]" />
                  <col className="w-[22%]" />
                </colgroup>
                <thead className="bg-slate-50 text-[11px] uppercase tracking-[0.08em] text-slate-500">
                  <tr>
                    <SortableHeader
                      label="Tenant"
                      field="name"
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                    />
                    <th className="px-5 py-4 font-extrabold max-[1000px]:px-2.5 max-[1000px]:py-3">Code</th>
                    <th className="px-5 py-4 font-extrabold max-[1000px]:px-2.5 max-[1000px]:py-3">Admin</th>
                    <th className="px-5 py-4 font-extrabold max-[1000px]:px-2.5 max-[1000px]:py-3">Plan</th>
                    <SortableHeader
                      label="Users"
                      field="users"
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                    />
                    <th className="px-5 py-4 font-extrabold max-[1000px]:px-2.5 max-[1000px]:py-3">Status</th>
                    <SortableHeader
                      label="Created"
                      field="createdAt"
                      sortBy={sortBy}
                      sortOrder={sortOrder}
                      onSort={handleSort}
                    />
                    <th className="px-5 py-4 font-extrabold max-[1000px]:px-2.5 max-[1000px]:py-3">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {pageItems.map((tenant) => (
                    <tr
                      key={tenant.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4 align-middle max-[1000px]:px-2.5 max-[1000px]:py-3">
                        <button
                          onClick={() => navigate(`/tenants/${tenant.id}`)}
                          className="text-sm font-extrabold text-slate-800 hover:text-indigo-600"
                        >
                          {tenant.name}
                        </button>
                      </td>
                      <td className="px-5 py-4 align-middle text-xs font-bold text-slate-500 max-[1000px]:px-2.5 max-[1000px]:py-3 max-[850px]:text-[10px]">
                        {tenant.code}
                      </td>
                      <td className="px-5 py-4 align-middle max-[1000px]:px-2.5 max-[1000px]:py-3">
                        <p className="text-sm font-semibold text-slate-700 max-[1000px]:text-[11px]">
                          {tenant.adminName}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400 max-[1000px]:hidden">
                          {tenant.adminEmail}
                        </p>
                      </td>
                      <td className="px-5 py-4 align-middle max-[1000px]:px-2.5 max-[1000px]:py-3">
                        <span className="whitespace-nowrap rounded-lg bg-indigo-50 px-2.5 py-1 text-[11px] font-bold text-indigo-700">
                          {tenant.subscription}
                        </span>
                      </td>
                      <td className="px-5 py-4 align-middle text-sm font-bold text-slate-700 max-[1000px]:px-2.5 max-[1000px]:py-3 max-[850px]:text-[11px]">
                        {tenant.users.toLocaleString()}
                      </td>
                      <td className="px-5 py-4 align-middle max-[1000px]:px-2.5 max-[1000px]:py-3">
                        <TenantStatusBadge status={tenant.status} />
                      </td>
                      <td className="px-5 py-4 align-middle text-xs font-semibold text-slate-500 max-[1000px]:px-2.5 max-[1000px]:py-3 max-[850px]:text-[10px]">
                        {new Date(tenant.createdAt).toLocaleDateString(
                          undefined,
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 align-middle max-[1000px]:px-2.5 max-[1000px]:py-3">
                        <div className="grid grid-cols-[42px_42px_88px_52px] items-center gap-0">
                          <button
                            title="View"
                            onClick={() =>
                              navigate(`/tenants/${tenant.id}`)
                            }
                            className="w-full rounded-lg px-1 py-2 text-center text-xs font-bold text-indigo-600 hover:bg-indigo-50"
                          >
                            View
                          </button>
                          <button
                            title="Edit"
                            onClick={() =>
                              navigate(`/tenants/${tenant.id}/edit`)
                            }
                            className="w-full rounded-lg px-1 py-2 text-center text-xs font-bold text-slate-600 hover:bg-slate-100"
                          >
                            Edit
                          </button>
                          <button
                            disabled={isMutating}
                            title={
                              tenant.status === "Active"
                                ? "Deactivate"
                                : "Activate"
                            }
                            onClick={() =>
                              void handleStatusChange(
                                tenant.id,
                                tenant.status === "Active"
                                  ? "Inactive"
                                  : "Active",
                              )
                            }
                            className={`w-full rounded-lg px-1 py-2 text-center text-xs font-bold disabled:opacity-40 ${
                              tenant.status === "Active"
                                ? "text-rose-600 hover:bg-rose-50"
                                : "text-emerald-600 hover:bg-emerald-50"
                            }`}
                          >
                            {tenant.status === "Active"
                              ? "Deactivate"
                              : "Activate"}
                          </button>
                          <button
                            disabled={isMutating}
                            title="Delete"
                            onClick={() =>
                              void handleDelete(tenant.id, tenant.name)
                            }
                            className="w-full rounded-lg px-1 py-2 text-center text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-40"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold text-slate-500">
            Showing{" "}
            {filteredTenants.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1}
            –{Math.min(currentPage * pageSize, filteredTenants.length)} of{" "}
            {filteredTenants.length}
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              className="h-9 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-extrabold text-indigo-700">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
              className="h-9 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SortableHeader({
  label,
  field,
  sortBy,
  sortOrder,
  onSort,
}: {
  label: string;
  field: SortBy;
  sortBy: SortBy;
  sortOrder: "asc" | "desc";
  onSort: (field: SortBy) => void;
}) {
  const active = sortBy === field;

  return (
    <th className="px-5 py-4 font-extrabold max-[1000px]:px-2.5 max-[1000px]:py-3">
      <button
        onClick={() => onSort(field)}
        className="inline-flex items-center gap-1 hover:text-indigo-600"
      >
        {label}
        <span className="text-[10px]">
          {active ? (sortOrder === "asc" ? "↑" : "↓") : "↕"}
        </span>
      </button>
    </th>
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
    <div>
      <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 truncate text-xs font-bold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function PageState({
  title,
  description = "Please wait while the latest tenant data is loaded.",
  actionLabel,
  onAction,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[420px] w-full max-w-[1500px] items-center justify-center">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        <h2 className="text-lg font-extrabold text-slate-800">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
        {actionLabel && (
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

export default Tenants;
