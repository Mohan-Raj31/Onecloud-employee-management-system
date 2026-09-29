export const kpiCardConfig = [
  {
    key: "totalTenants",
    label: "Total Tenants",
    helper: "Organizations on platform",
    icon: "◈",
    tone: "indigo" as const,
  },
  {
    key: "activeTenants",
    label: "Active Tenants",
    helper: "Currently operational",
    icon: "✓",
    tone: "green" as const,
  },
  {
    key: "inactiveTenants",
    label: "Inactive Tenants",
    helper: "Require attention",
    icon: "○",
    tone: "red" as const,
  },
  {
    key: "totalUsers",
    label: "Total Users",
    helper: "Users across tenants",
    icon: "◉",
    tone: "blue" as const,
  },
  {
    key: "activeLicenses",
    label: "Active Licenses",
    helper: "Licenses currently enabled",
    icon: "◇",
    tone: "amber" as const,
  },
];

export const employeeStatCardConfig = [
  {
    key: "total",
    label: "Total Employees",
    tone: "indigo" as const,
  },
  {
    key: "active",
    label: "Active Employees",
    tone: "green" as const,
  },
  {
    key: "inactive",
    label: "Inactive Employees",
    tone: "red" as const,
  },
  {
    key: "departments",
    label: "Departments",
    tone: "violet" as const,
  },
] as const;