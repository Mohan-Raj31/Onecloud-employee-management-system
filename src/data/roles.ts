import type { Role } from "../types";

const permissions = (
  view = false,
  create = false,
  edit = false,
  deletePermission = false,
) => [
  {
    module: "Users",
    view,
    create,
    edit,
    delete: deletePermission,
  },
  {
    module: "Organizations",
    view,
    create,
    edit,
    delete: deletePermission,
  },
  {
    module: "Employees",
    view,
    create,
    edit,
    delete: deletePermission,
  },
  {
    module: "Reports",
    view,
    create,
    edit,
    delete: deletePermission,
  },
  {
    module: "Settings",
    view,
    create,
    edit,
    delete: deletePermission,
  },
  {
    module: "Roles",
    view,
    create,
    edit,
    delete: deletePermission,
  },
  {
    module: "Permissions",
    view,
    create,
    edit,
    delete: deletePermission,
  },
  {
    module: "Audit Logs",
    view,
    create,
    edit,
    delete: deletePermission,
  },
];

export const roleData: Role[] = [
  {
    id: 1,
    name: "Super Administrator",
    code: "SUPER_ADMIN",
    type: "System Role",
    description:
      "Full platform administration access.",
    modules: [
      "Dashboard",
      "User Management",
      "Organizations",
      "Employees",
      "Reports",
      "Settings",
      "Roles Management",
      "Permissions",
    ],
    permissions: permissions(
      true,
      true,
      true,
      true,
    ),
    users: 1,
    status: "Active",
    parentRole: "",
    inheritPermissions: false,
    createdAt: "01 Oct 2026",
  },

  {
    id: 2,
    name: "HR Manager",
    code: "HR_MANAGER",
    type: "Business Role",
    description:
      "Manages employees and HR operations.",
    modules: [
      "Dashboard",
      "User Management",
      "Employees",
      "Reports",
      "Roles Management",
      "Permissions",
    ],
    permissions: permissions(
      true,
      true,
      true,
      false,
    ),
    users: 25,
    status: "Active",
    parentRole:
      "Super Administrator",
    inheritPermissions: true,
    createdAt: "01 Oct 2026",
  },

  {
    id: 3,
    name: "Department Manager",
    code: "DEPT_MANAGER",
    type: "Business Role",
    description:
      "Manages department-level activities.",
    modules: [
      "Dashboard",
      "Employees",
      "Reports",
      "User Management",
      "Organizations",
    ],
    permissions: permissions(
      true,
      true,
      true,
      false,
    ),
    users: 40,
    status: "Active",
    parentRole:
      "HR Manager",
    inheritPermissions: true,
    createdAt: "01 Oct 2026",
  },

  {
    id: 4,
    name: "Employee",
    code: "EMPLOYEE",
    type: "Default Role",
    description:
      "Standard employee access.",
    modules: [
      "Dashboard",
      "Employees",
      "Reports",
    ],
    permissions: permissions(
      true,
      false,
      false,
      false,
    ),
    users: 850,
    status: "Active",
    parentRole: "",
    inheritPermissions: false,
    createdAt: "01 Oct 2026",
  },

  {
    id: 5,
    name: "Finance Manager",
    code: "FIN_MANAGER",
    type: "Business Role",
    description:
      "Manages finance-related operations.",
    modules: [
      "Dashboard",
      "Reports",
      "Organizations",
      "Settings",
      "User Management",
    ],
    permissions: permissions(
      true,
      true,
      true,
      false,
    ),
    users: 15,
    status: "Active",
    parentRole: "",
    inheritPermissions: false,
    createdAt: "01 Oct 2026",
  },

  {
    id: 6,
    name: "Sales Manager",
    code: "SALES_MANAGER",
    type: "Business Role",
    description:
      "Manages sales operations.",
    modules: [
      "Dashboard",
      "User Management",
      "Reports",
      "Employees",
    ],
    permissions: permissions(
      true,
      true,
      true,
      false,
    ),
    users: 22,
    status: "Active",
    parentRole: "",
    inheritPermissions: false,
    createdAt: "01 Oct 2026",
  },

  {
    id: 7,
    name: "Support Executive",
    code: "SUPPORT_EXEC",
    type: "Custom Role",
    description:
      "Support team access.",
    modules: [
      "Dashboard",
      "User Management",
      "Reports",
      "Audit Logs",
    ],
    permissions: permissions(
      true,
      false,
      false,
      false,
    ),
    users: 35,
    status: "Inactive",
    parentRole: "",
    inheritPermissions: false,
    createdAt: "01 Oct 2026",
  },

  {
    id: 8,
    name: "Report Viewer",
    code: "REPORT_VIEWER",
    type: "Custom Role",
    description:
      "Read-only reporting access.",
    modules: [
      "Dashboard",
      "Reports",
    ],
    permissions: permissions(
      true,
      false,
      false,
      false,
    ),
    users: 18,
    status: "Active",
    parentRole: "",
    inheritPermissions: false,
    createdAt: "01 Oct 2026",
  },
];