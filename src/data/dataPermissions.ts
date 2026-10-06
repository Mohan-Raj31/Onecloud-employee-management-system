import type {
  DataPermission,
  DataPermissionType,
  DataScope,
  OwnershipRule,
} from "../types";

export const dataPermissionPolicyTypes: DataPermissionType[] = [
  "Organization-Based",
  "Business Unit-Based",
  "Department-Based",
  "Branch-Based",
  "Project-Based",
  "Location-Based",
];

export const dataPermissionScopes: DataScope[] = [
  "Organization",
  "Business Unit",
  "Department",
  "Branch",
  "Project",
  "Location",
  "Customer",
  "Vendor",
];

export const ownershipRules: OwnershipRule[] = [
  "Own Records Only",
  "Team Records",
  "Department Records",
  "Organization Records",
];

export const dataPermissionOrganizations = [
  "ABC Technologies",
  "XYZ Industries",
  "Global Solutions",
  "NextGen Systems",
];

export const dataPermissionRoles = [
  "System Admin",
  "HR Manager",
  "Finance Manager",
  "Manager",
  "Employee",
];

export const departmentOptions = [
  "Human Resources",
  "Finance",
  "Information Technology",
  "Sales",
  "Operations",
];

export const businessUnitOptions = [
  "Corporate Services",
  "Technology Division",
  "Finance Division",
  "Sales Division",
];

export const branchOptions = [
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Pune",
];

export const projectOptions = [
  "Enterprise HRMS",
  "OneCloud Platform",
  "Finance Transformation",
  "CRM Implementation",
];

export const locationOptions = [
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Pune",
];

export const customerOptions = [
  "Acme Corporation",
  "Global Retail",
  "Prime Industries",
];

export const vendorOptions = [
  "TechSource",
  "CloudWorks",
  "Office Solutions",
];

export const dataPermissionData: DataPermission[] = [
  {
    id: 1,
    policyName: "HR Department Data Access",
    policyType: "Department-Based",
    organization: "ABC Technologies",
    role: "HR Manager",
    status: "Active",
    dataScopes: [
      "Organization",
      "Business Unit",
      "Department",
    ],
    department: "Human Resources",
    businessUnit: "Corporate Services",
    branch: "Hyderabad",
    project: "",
    location: "Hyderabad",
    customer: "",
    vendor: "",
    ownershipRules: [
      "Own Records Only",
      "Department Records",
    ],
    viewSubordinateRecords: true,
    approveSubordinateTransactions: true,
    accessibleRecords: 842,
    restrictedRecords: 126,
    createdBy: "Super Admin",
    createdAt: "08-Aug-2026",
  },

  {
    id: 2,
    policyName: "Finance Department Data Access",
    policyType: "Department-Based",
    organization: "ABC Technologies",
    role: "Finance Manager",
    status: "Active",
    dataScopes: [
      "Organization",
      "Business Unit",
      "Department",
    ],
    department: "Finance",
    businessUnit: "Finance Division",
    branch: "Bengaluru",
    project: "",
    location: "Bengaluru",
    customer: "",
    vendor: "",
    ownershipRules: [
      "Own Records Only",
      "Department Records",
    ],
    viewSubordinateRecords: true,
    approveSubordinateTransactions: true,
    accessibleRecords: 618,
    restrictedRecords: 94,
    createdBy: "Super Admin",
    createdAt: "07-Aug-2026",
  },

  {
    id: 3,
    policyName: "Project Data Access",
    policyType: "Project-Based",
    organization: "XYZ Industries",
    role: "Manager",
    status: "Active",
    dataScopes: [
      "Organization",
      "Project",
    ],
    department: "Information Technology",
    businessUnit: "Technology Division",
    branch: "Chennai",
    project: "OneCloud Platform",
    location: "Chennai",
    customer: "Acme Corporation",
    vendor: "CloudWorks",
    ownershipRules: [
      "Own Records Only",
      "Team Records",
    ],
    viewSubordinateRecords: true,
    approveSubordinateTransactions: false,
    accessibleRecords: 456,
    restrictedRecords: 72,
    createdBy: "Super Admin",
    createdAt: "05-Aug-2026",
  },

  {
    id: 4,
    policyName: "Sales Branch Data Access",
    policyType: "Branch-Based",
    organization: "Global Solutions",
    role: "Manager",
    status: "Inactive",
    dataScopes: [
      "Organization",
      "Branch",
      "Location",
    ],
    department: "Sales",
    businessUnit: "Sales Division",
    branch: "Pune",
    project: "",
    location: "Pune",
    customer: "Global Retail",
    vendor: "",
    ownershipRules: [
      "Team Records",
    ],
    viewSubordinateRecords: true,
    approveSubordinateTransactions: false,
    accessibleRecords: 231,
    restrictedRecords: 89,
    createdBy: "Super Admin",
    createdAt: "03-Aug-2026",
  },

  {
    id: 5,
    policyName: "Customer Data Access",
    policyType: "Location-Based",
    organization: "NextGen Systems",
    role: "Manager",
    status: "Active",
    dataScopes: [
      "Organization",
      "Customer",
      "Location",
    ],
    department: "Operations",
    businessUnit: "Corporate Services",
    branch: "Hyderabad",
    project: "",
    location: "Hyderabad",
    customer: "Prime Industries",
    vendor: "",
    ownershipRules: [
      "Own Records Only",
    ],
    viewSubordinateRecords: false,
    approveSubordinateTransactions: false,
    accessibleRecords: 389,
    restrictedRecords: 51,
    createdBy: "Super Admin",
    createdAt: "01-Aug-2026",
  },
];