import { tenants as seedTenants, tenantActivities as seedActivities } from "../data/tenants";
import type {
  RecentActivity,
  Tenant,
  TenantFormData,
  TenantStats,
} from "../types";

const TENANTS_STORAGE_KEY = "onecloud_super_admin_tenants_v1";
const ACTIVITIES_STORAGE_KEY = "onecloud_super_admin_activities_v1";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

function readTenants(): Tenant[] {
  const saved = localStorage.getItem(TENANTS_STORAGE_KEY);

  if (!saved) {
    const initial = clone(seedTenants);
    localStorage.setItem(TENANTS_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    return JSON.parse(saved) as Tenant[];
  } catch {
    const initial = clone(seedTenants);
    localStorage.setItem(TENANTS_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
}

function writeTenants(value: Tenant[]) {
  localStorage.setItem(TENANTS_STORAGE_KEY, JSON.stringify(value));
}

function readActivities(): RecentActivity[] {
  const saved = localStorage.getItem(ACTIVITIES_STORAGE_KEY);

  if (!saved) {
    const initial = clone(seedActivities);
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    return JSON.parse(saved) as RecentActivity[];
  } catch {
    const initial = clone(seedActivities);
    localStorage.setItem(ACTIVITIES_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
}

function addActivity(
  type: RecentActivity["type"],
  message: string,
  tenantName: string,
) {
  const activities = readActivities();
  const next: RecentActivity = {
    id: Date.now(),
    type,
    message,
    tenantName,
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    ACTIVITIES_STORAGE_KEY,
    JSON.stringify([next, ...activities].slice(0, 20)),
  );
}

export async function getTenants(): Promise<Tenant[]> {
  return clone(readTenants());
}

export async function getTenant(id: number): Promise<Tenant> {
  const tenant = readTenants().find((item) => item.id === id);

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  return clone(tenant);
}

export async function getTenantStats(id: number): Promise<TenantStats> {
  const tenant = await getTenant(id);

  return {
    users: tenant.users,
    organizations: tenant.organizations,
    activeUsers: tenant.activeUsers,
    storageUsed: tenant.storageUsed,
  };
}

export async function createTenant(data: TenantFormData): Promise<Tenant> {
  const current = readTenants();
  const normalizedCode = data.code.trim().toUpperCase();

  if (current.some((tenant) => tenant.code.toUpperCase() === normalizedCode)) {
    throw new Error("Tenant code already exists");
  }

  const nextId = Math.max(0, ...current.map((tenant) => tenant.id)) + 1;
  const tenant: Tenant = {
    id: nextId,
    ...data,
    code: normalizedCode,
    createdAt: new Date().toISOString(),
    users: 1,
    organizations: 0,
    activeUsers: data.status === "Active" ? 1 : 0,
    storageUsed: 0,
    licenseActive: data.status === "Active",
  };

  writeTenants([tenant, ...current]);
  addActivity("created", "New tenant created", tenant.name);
  return clone(tenant);
}

export async function updateTenant(
  id: number,
  data: TenantFormData,
): Promise<Tenant> {
  const current = readTenants();
  const existing = current.find((tenant) => tenant.id === id);

  if (!existing) {
    throw new Error("Tenant not found");
  }

  const normalizedCode = data.code.trim().toUpperCase();
  const duplicateCode = current.some(
    (tenant) =>
      tenant.id !== id && tenant.code.toUpperCase() === normalizedCode,
  );

  if (duplicateCode) {
    throw new Error("Tenant code already exists");
  }

  const updated: Tenant = {
    ...existing,
    ...data,
    code: normalizedCode,
    licenseActive: data.status === "Active" ? existing.licenseActive || true : false,
  };

  const updatedTenants = current.map((tenant) =>
    tenant.id === id ? updated : tenant,
  );

  writeTenants(updatedTenants);
  addActivity("updated", "Tenant configuration updated", updated.name);
  return clone(updated);
}

export async function deleteTenant(id: number): Promise<void> {
  const current = readTenants();
  const existing = current.find((tenant) => tenant.id === id);

  if (!existing) {
    throw new Error("Tenant not found");
  }

  writeTenants(current.filter((tenant) => tenant.id !== id));
  addActivity("deleted", "Tenant deleted", existing.name);
}

export async function activateTenant(id: number): Promise<Tenant> {
  return setTenantStatus(id, "Active");
}

export async function deactivateTenant(id: number): Promise<Tenant> {
  return setTenantStatus(id, "Inactive");
}

async function setTenantStatus(
  id: number,
  status: Tenant["status"],
): Promise<Tenant> {
  const current = readTenants();
  const existing = current.find((tenant) => tenant.id === id);

  if (!existing) {
    throw new Error("Tenant not found");
  }

  const updated: Tenant = {
    ...existing,
    status,
    licenseActive: status === "Active" ? true : false,
  };

  writeTenants(
    current.map((tenant) => (tenant.id === id ? updated : tenant)),
  );

  addActivity(
    status === "Active" ? "activated" : "deactivated",
    status === "Active" ? "Tenant activated" : "Tenant deactivated",
    updated.name,
  );

  return clone(updated);
}

export async function getDashboardStats() {
  const current = readTenants();

  return {
    totalTenants: current.length,
    activeTenants: current.filter((tenant) => tenant.status === "Active").length,
    inactiveTenants: current.filter((tenant) => tenant.status === "Inactive").length,
    totalUsers: current.reduce((total, tenant) => total + tenant.users, 0),
    activeLicenses: current.filter((tenant) => tenant.licenseActive).length,
  };
}

export async function getPlatformHealth() {
  return {
    apiGateway: "Healthy" as const,
    database: "Connected" as const,
    server: "Running" as const,
    storage: 68,
    cpu: 42,
    memory: 61,
  };
}

export async function getTenantGrowth() {
  const current = readTenants();
  const months = [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
  ];

  const now = new Date();
  return months.map((month, index) => {
    const targetMonth = new Date(now.getFullYear(), now.getMonth() - (months.length - 1 - index), 1);
    const tenantsCreated = current.filter((tenant) => {
      const created = new Date(tenant.createdAt);
      return (
        created.getFullYear() < targetMonth.getFullYear() ||
        (created.getFullYear() === targetMonth.getFullYear() &&
          created.getMonth() <= targetMonth.getMonth())
      );
    }).length;

    return { month, tenants: tenantsCreated };
  });
}

export async function getTenantStatusBreakdown() {
  const current = readTenants();

  return {
    active: current.filter((tenant) => tenant.status === "Active").length,
    inactive: current.filter((tenant) => tenant.status === "Inactive").length,
  };
}

export async function getRecentActivities(): Promise<RecentActivity[]> {
  return clone(
    readActivities().sort(
      (first, second) =>
        new Date(second.createdAt).getTime() -
        new Date(first.createdAt).getTime(),
    ),
  );
}
