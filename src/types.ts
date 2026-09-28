export type EmployeeStatus = "Active" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: EmployeeStatus;
  image?: string;
}

export interface EmployeeFormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: EmployeeStatus;
}

export type TenantStatus = "Active" | "Inactive";
export type SubscriptionPlan = "Basic" | "Pro" | "Enterprise";

export interface Tenant {
  id: number;
  name: string;
  code: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  subscription: SubscriptionPlan;
  country: string;
  timeZone: string;
  status: TenantStatus;
  createdAt: string;
  users: number;
  organizations: number;
  activeUsers: number;
  storageUsed: number;
  licenseActive: boolean;
}

export interface TenantFormData {
  name: string;
  code: string;
  adminName: string;
  adminEmail: string;
  phone: string;
  subscription: SubscriptionPlan;
  country: string;
  timeZone: string;
  status: TenantStatus;
}

export interface TenantListParams {
  search?: string;
  status?: TenantStatus | "All";
  subscription?: SubscriptionPlan | "All";
  page?: number;
  pageSize?: number;
  sortBy?: "name" | "users" | "createdAt" | "status";
  sortOrder?: "asc" | "desc";
}

export interface TenantStats {
  users: number;
  organizations: number;
  activeUsers: number;
  storageUsed: number;
}

export interface PlatformHealth {
  apiGateway: "Healthy" | "Degraded" | "Down";
  database: "Connected" | "Disconnected";
  server: "Running" | "Stopped";
  storage: number;
  cpu: number;
  memory: number;
}

export type ActivityType =
  | "created"
  | "activated"
  | "updated"
  | "renewed"
  | "deactivated"
  | "deleted";

export interface RecentActivity {
  id: number;
  type: ActivityType;
  message: string;
  tenantName: string;
  createdAt: string;
}

export interface DashboardStats {
  totalTenants: number;
  activeTenants: number;
  inactiveTenants: number;
  totalUsers: number;
  activeLicenses: number;
}

export interface TenantGrowthPoint {
  month: string;
  tenants: number;
}

export interface TenantStatusBreakdown {
  active: number;
  inactive: number;
}

export interface SuperAdminDashboardData {
  stats: DashboardStats;
  health: PlatformHealth;
  growth: TenantGrowthPoint[];
  tenantStatus: TenantStatusBreakdown;
  activities: RecentActivity[];
}
