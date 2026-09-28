import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import KpiCard from "../components/dashboard/KpiCard";
import PlatformHealth from "../components/dashboard/PlatformHealth";
import RecentActivities from "../components/dashboard/RecentActivities";
import TenantGrowthChart from "../components/dashboard/TenantGrowthChart";
import TenantStatusChart from "../components/dashboard/TenantStatusChart";
import { useEmployees } from "../../hooks/useEmployees";
import { useSuperAdminDashboard } from "../hooks/useSuperAdminDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const {
    data,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
    refetch,
  } = useSuperAdminDashboard();
  const {
    employees = [],
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
    refetch: refetchEmployees,
  } = useEmployees();

  const employeeStats = useMemo(() => {
    const departments = new Set(
      employees.map((employee) => employee.department),
    );

    return {
      total: employees.length,
      active: employees.filter((employee) => employee.status === "Active")
        .length,
      inactive: employees.filter((employee) => employee.status === "Inactive")
        .length,
      departments: departments.size,
    };
  }, [employees]);

  if (isDashboardLoading || isEmployeesLoading) {
    return (
      <DashboardState
        title="Loading dashboard..."
        description="Preparing the latest tenant and employee information."
      />
    );
  }

  if (isDashboardError || isEmployeesError || !data) {
    return (
      <DashboardState
        title="Unable to load dashboard"
        description="The latest tenant or employee information could not be loaded."
        actionLabel="Try Again"
        onAction={() => {
          void refetch();
          void refetchEmployees();
        }}
      />
    );
  }

  const { stats, health, growth, activities, tenantStatus } = data;

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-7">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100 max-[650px]:h-9 max-[650px]:w-9" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </span>
            <h1 className="whitespace-nowrap text-[30px] font-extrabold tracking-[-1px] max-[650px]:text-[22px] max-[400px]:text-[19px] bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-transparent">
              Welcome to OneCloud
            </h1>
          </div>
          
          <p className="text-sm font-medium text-[#667085]">
            Platform overview for tenants and employees
          </p>
        </div>

        <button
          onClick={() => navigate("/tenants/new")}
          className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 max-lg:w-full"
        >
          + Create Tenant
        </button>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4 max-[650px]:gap-2">
          <div className="min-w-0">
            <h2 className="whitespace-nowrap text-[22px] font-extrabold text-red-900 sm:text-2xl">
              Platform Overview
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Tenant, user and licensing metrics
            </p>
          </div>
          <button
            onClick={() => navigate("/tenants")}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            Manage Tenants →
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <KpiCard
            label="Total Tenants"
            value={stats.totalTenants.toLocaleString()}
            helper="Organizations on platform"
            icon="◈"
            tone="indigo"
          />
          <KpiCard
            label="Active Tenants"
            value={stats.activeTenants.toLocaleString()}
            helper="Currently operational"
            icon="✓"
            tone="green"
          />
          <KpiCard
            label="Inactive Tenants"
            value={stats.inactiveTenants.toLocaleString()}
            helper="Require attention"
            icon="○"
            tone="red"
          />
          <KpiCard
            label="Total Users"
            value={stats.totalUsers.toLocaleString()}
            helper="Users across tenants"
            icon="◉"
            tone="blue"
          />
          <KpiCard
            label="Active Licenses"
            value={stats.activeLicenses.toLocaleString()}
            helper="Licenses currently enabled"
            icon="◇"
            tone="amber"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
        <TenantGrowthChart data={growth} />
        <TenantStatusChart
          active={tenantStatus.active}
          inactive={tenantStatus.inactive}
        />
      </section>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <PlatformHealth health={health} />
        <RecentActivities activities={activities} />
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4 max-[650px]:gap-2">
          <div className="min-w-0">
            <h2 className="whitespace-nowrap text-2xl font-extrabold text-red-900 max-[650px]:text-[20px] max-[400px]:text-[18px]">
              Employee Overview
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Current employee statistics
            </p>
          </div>
          <button
            onClick={() => navigate("/employees")}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            View Employees →
          </button>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <EmployeeStatCard
            label="Total Employees"
            value={employeeStats.total}
          />
          <EmployeeStatCard
            label="Active Employees"
            value={employeeStats.active}
            tone="green"
          />
          <EmployeeStatCard
            label="Inactive Employees"
            value={employeeStats.inactive}
            tone="red"
          />
          <EmployeeStatCard
            label="Departments"
            value={employeeStats.departments}
            tone="violet"
          />
        </div>
      </section>
    </div>
  );
}

function EmployeeStatCard({
  label,
  value,
  tone = "indigo",
}: {
  label: string;
  value: number;
  tone?: "indigo" | "green" | "red" | "violet";
}) {
  const valueClass = {
    indigo: "text-[#4f46e5]",
    green: "text-[#16a34a]",
    red: "text-[#dc2626]",
    violet: "text-[#7c3aed]",
  }[tone];

  const backgroundClass = {
    indigo: "from-white to-[#f7f8ff]",
    green: "from-white to-[#f7fff9]",
    red: "from-white to-[#fff9f9]",
    violet: "from-white to-[#f8f5ff]",
  }[tone];

  return (
    <div
      className={`rounded-[17px] border border-[#e5e7eb] bg-gradient-to-br ${backgroundClass} p-[22px] shadow-[0_8px_25px_rgba(15,23,42,0.05)]`}
    >
      <p className="mb-2 text-[12px] font-bold text-[#667085]">{label}</p>
      <h3 className={`text-[29px] font-extrabold ${valueClass}`}>
        {value.toLocaleString()}
      </h3>
    </div>
  );
}

function DashboardState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[500px] w-full max-w-[1500px] items-center justify-center">
      <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-[0_12px_35px_rgba(15,23,42,0.06)]">
        {actionLabel ? (
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            !
          </div>
        ) : (
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        )}
        <h2 className="text-lg font-extrabold text-slate-800">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
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

export default Dashboard;
