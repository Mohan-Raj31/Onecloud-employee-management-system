import type {
  Permission,
} from "../types";

export const permissionData: Permission[] = [
  {
    id: 1,
    name: "Employee - View",
    code: "EMP_VIEW",
    module: "Employee Management",
    type: "Read Only",
    description:
      "Allows users to view employee information.",
    actions: ["View"],
    assignedRoles: 6,
    status: "Active",
    createdBy: "Super Admin",
    createdAt: "08 Aug 2026",
  },

  {
    id: 2,
    name: "Employee - Create",
    code: "EMP_CREATE",
    module: "Employee Management",
    type: "CRUD",
    description:
      "Allows users to create employee records.",
    actions: ["View", "Create"],
    assignedRoles: 5,
    status: "Active",
    createdBy: "Super Admin",
    createdAt: "08 Aug 2026",
  },

  {
    id: 3,
    name: "Employee - Manage",
    code: "EMP_MANAGE",
    module: "Employee Management",
    type: "CRUD",
    description:
      "Allows users to create, update and delete employee records.",
    actions: [
      "View",
      "Create",
      "Update",
      "Delete",
    ],
    assignedRoles: 4,
    status: "Active",
    createdBy: "Super Admin",
    createdAt: "08 Aug 2026",
  },

  {
    id: 4,
    name: "Organization - Manage",
    code: "ORG_MANAGE",
    module: "Organization Management",
    type: "CRUD",
    description:
      "Allows users to manage organization records.",
    actions: [
      "View",
      "Create",
      "Update",
      "Delete",
    ],
    assignedRoles: 3,
    status: "Active",
    createdBy: "Super Admin",
    createdAt: "08 Aug 2026",
  },

  {
    id: 5,
    name: "User - Manage",
    code: "USER_MANAGE",
    module: "User Management",
    type: "CRUD",
    description:
      "Allows users to manage platform users.",
    actions: [
      "View",
      "Create",
      "Update",
      "Delete",
    ],
    assignedRoles: 4,
    status: "Active",
    createdBy: "Super Admin",
    createdAt: "08 Aug 2026",
  },

  {
    id: 6,
    name: "Reports - Export",
    code: "REPORT_EXPORT",
    module: "Reports",
    type: "Import / Export",
    description:
      "Allows users to export reports.",
    actions: [
      "View",
      "Export",
    ],
    assignedRoles: 5,
    status: "Active",
    createdBy: "Super Admin",
    createdAt: "08 Aug 2026",
  },

  {
    id: 7,
    name: "Reports - Approve",
    code: "REPORT_APPROVE",
    module: "Reports",
    type: "Approval",
    description:
      "Allows users to approve reports.",
    actions: [
      "View",
      "Approve",
    ],
    assignedRoles: 2,
    status: "Active",
    createdBy: "Super Admin",
    createdAt: "08 Aug 2026",
  },

  {
    id: 8,
    name: "Settings - Manage",
    code: "SETTINGS_MANAGE",
    module: "Settings",
    type: "Custom",
    description:
      "Allows users to manage system settings.",
    actions: [
      "View",
      "Update",
    ],
    assignedRoles: 2,
    status: "Inactive",
    createdBy: "Super Admin",
    createdAt: "08 Aug 2026",
  },

  {
    id: 9,
    name: "Audit Logs - View",
    code: "AUDIT_VIEW",
    module: "Audit Logs",
    type: "Read Only",
    description:
      "Allows users to view audit logs.",
    actions: ["View"],
    assignedRoles: 3,
    status: "Active",
    createdBy: "Super Admin",
    createdAt: "08 Aug 2026",
  },
];