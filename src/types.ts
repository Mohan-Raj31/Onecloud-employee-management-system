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

export type OrganizationStatus = "Active" | "Inactive";

export type BusinessType =
  | "IT Services"
  | "Manufacturing"
  | "Consulting";

export interface Organization {
  id: number;
  name: string;
  code: string;
  businessType: BusinessType;
  location: string;
  status: OrganizationStatus;
  createdAt: string;
}

export interface OrganizationOverviewStats {
  companies: number;
  businessUnits: number;
  departments: number;
  branches: number;
  costCentres: number;
  locations: number;
}

export interface OrganizationManagementData {
  stats: OrganizationOverviewStats;
  organizations: Organization[];
}


export type UserStatus = "Active" | "Inactive" | "Pending";

export type UserRole =
  | "System Admin"
  | "HR Manager"
  | "Manager"
  | "Employee";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  mobile: string;

  organization: string;
  businessUnit: string;
  department: string;
  branch: string;

  username: string;
  role: UserRole;
  reportingManager: string;

  status: UserStatus;
  emailVerified: boolean;
  mobileVerified: boolean;

  createdAt: string;
}

export type RoleType =
  | "System Role"
  | "Business Role"
  | "Default Role"
  | "Custom Role";

export type RoleStatus =
  | "Active"
  | "Inactive";

export interface RolePermission {
  module: string;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface Role {
  id: number;
  name: string;
  code: string;
  type: RoleType;
  description: string;
  modules: string[];
  permissions: RolePermission[];
  users: number;
  status: RoleStatus;
  parentRole?: string;
  inheritPermissions?: boolean;
  createdAt?: string;
}

export type RoleFormData = Omit<
  Role,
  "id" | "createdAt"
>;


export type PermissionStatus =
  | "Active"
  | "Inactive";

export type PermissionType =
  | "CRUD"
  | "Approval"
  | "Import / Export"
  | "Read Only"
  | "Custom";

export type PermissionAction =
  | "View"
  | "Create"
  | "Update"
  | "Delete"
  | "Approve"
  | "Import"
  | "Export"
  | "Print";

export interface Permission {
  id: number;
  name: string;
  code: string;
  module: string;
  type: PermissionType;
  description: string;
  actions: PermissionAction[];
  assignedRoles: number;
  status: PermissionStatus;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export type PermissionFormData = Omit<
  Permission,
  "id" | "createdAt" | "updatedAt"
>;

export type DataPermissionStatus =
  | "Active"
  | "Inactive";

export type DataPermissionType =
  | "Organization-Based"
  | "Business Unit-Based"
  | "Department-Based"
  | "Branch-Based"
  | "Project-Based"
  | "Location-Based";

export type DataScope =
  | "Organization"
  | "Business Unit"
  | "Department"
  | "Branch"
  | "Project"
  | "Location"
  | "Customer"
  | "Vendor";

export type OwnershipRule =
  | "Own Records Only"
  | "Team Records"
  | "Department Records"
  | "Organization Records";

export interface DataPermission {
  id: number;
  policyName: string;
  policyType: DataPermissionType;
  organization: string;
  role: string;
  status: DataPermissionStatus;

  dataScopes: DataScope[];

  department: string;
  businessUnit: string;
  branch: string;
  project: string;
  location: string;
  customer: string;
  vendor: string;

  ownershipRules: OwnershipRule[];

  viewSubordinateRecords: boolean;
  approveSubordinateTransactions: boolean;

  accessibleRecords: number;
  restrictedRecords: number;

  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export type DataPermissionFormData = Omit<
  DataPermission,
  "id" | "createdAt" | "updatedAt"
>;

export type PlatformConfiguration = {
  platformName: string;
  platformUrl: string;
  supportEmail: string;
  timezone: string;
  sessionTimeout: string;
  passwordPolicy: string;
  loginSecurity: boolean;
  smtpHost: string;
  smtpPort: string;
  senderEmail: string;
  emailNotifications: boolean;
  maintenanceMode: boolean;
  fileUploadLimit: string;
  systemNotifications: boolean;
};

export type FeatureStatus = "Enabled" | "Disabled";

export type Feature = {
  id: number;
  name: string;
  module: string;
  licensePlan: string;
  status: FeatureStatus;
  description?: string;
};

export type FeatureManagementData = {
  features: Feature[];
};

export type LicenseStatus =
  | "Active"
  | "Suspended"
  | "Expired"
  | "Pending";

export type License = {
  id: number;
  licenseKey: string;
  organization: string;
  licenseType: string;
  activationDate: string;
  expiryDate: string;
  status: LicenseStatus;
  renewalPeriod: string;
};

export type LicenseSummaryCard = {
  key:
    | "total"
    | "active"
    | "expired"
    | "suspended";
  label: string;
  description: string;
};

export type LicenseManagementData = {
  licenses: License[];
};

export type GlobalSettings = {
  settingId: string;
  settingName: string;
  category: string;
  description: string;
  status: "Active" | "Inactive";

  defaultLanguage: string;
  defaultTimeZone: string;
  defaultCurrency: string;
  dateFormat: string;
  timeFormat: string;
  numberFormat: string;

  sessionTimeout: number;
  autoLogout: boolean;
  passwordExpiry: number;
  maximumLoginAttempts: number;
  maintenanceNotification: boolean;
  systemAnnouncement: boolean;

  updatedBy: string;
  updatedOn: string;
};


export type AuditLogStatus = "Success" | "Failed" | "Warning";
export type AuditCategory =
  | "User"
  | "System"
  | "Security"
  | "Configuration"
  | "Workflow";

export type AuditActivityType =
  | "Create"
  | "Update"
  | "Delete"
  | "Login"
  | "Logout"
  | "Approval"
  | "Configuration";

export interface AuditLog {
  id: number;
  auditId: string;
  auditCategory: AuditCategory;
  moduleName: string;
  activityType: AuditActivityType;
  userId: string;
  username: string;
  role: string;
  organization: string;
  tenant: string;
  activityPerformed: string;
  timestamp: string;
  ipAddress: string;
  deviceInformation: string;
  browserInformation: string;
  previousValue: string;
  newValue: string;
  remarks: string;
  status: AuditLogStatus;
  archived: boolean;
}