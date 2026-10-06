import type { License } from "../types";

export const licenseManagementData: License[] = [
  {
    id: 1,
    licenseKey: "OC-ENT-2026-001",
    organization: "ABC Pvt Ltd",
    licenseType: "Enterprise",
    activationDate: "01-Jul-2026",
    expiryDate: "30-Jun-2027",
    status: "Active",
    renewalPeriod: "12 Months",
  },
  {
    id: 2,
    licenseKey: "OC-PRO-2026-002",
    organization: "XYZ Ltd",
    licenseType: "Professional",
    activationDate: "15-Jul-2026",
    expiryDate: "14-Jul-2027",
    status: "Active",
    renewalPeriod: "12 Months",
  },
  {
    id: 3,
    licenseKey: "OC-STD-2026-003",
    organization: "123 Inc",
    licenseType: "Standard",
    activationDate: "01-Jan-2026",
    expiryDate: "31-Oct-2026",
    status: "Active",
    renewalPeriod: "12 Months",
  },
  {
    id: 4,
    licenseKey: "OC-STD-2025-004",
    organization: "Demo Company",
    licenseType: "Standard",
    activationDate: "01-Jan-2025",
    expiryDate: "31-Dec-2025",
    status: "Expired",
    renewalPeriod: "12 Months",
  },
  {
    id: 5,
    licenseKey: "OC-PRO-2026-005",
    organization: "Global Systems",
    licenseType: "Professional",
    activationDate: "10-Aug-2026",
    expiryDate: "09-Aug-2027",
    status: "Suspended",
    renewalPeriod: "12 Months",
  },
  {
    id: 6,
    licenseKey: "OC-ENT-2026-006",
    organization: "Tech Solutions",
    licenseType: "Enterprise",
    activationDate: "01-Sep-2026",
    expiryDate: "31-Aug-2027",
    status: "Active",
    renewalPeriod: "12 Months",
  },
];

export const licenseSummaryCards = [
  {
    key: "total",
    label: "Total Licenses",
    description: "All platform licenses",
  },
  {
    key: "active",
    label: "Active Licenses",
    description: "Currently active",
  },
  {
    key: "expired",
    label: "Expired Licenses",
    description: "Licenses past expiry",
  },
  {
    key: "suspended",
    label: "Suspended Licenses",
    description: "Temporarily suspended",
  },
] as const;

export const licenseTypeOptions = [
  "All License Types",
  "Standard",
  "Professional",
  "Enterprise",
];

export const licenseStatusOptions = [
  "All Status",
  "Active",
  "Suspended",
  "Expired",
  "Pending",
];

export const licenseOrganizationOptions = [
  "All Organizations",
  "ABC Pvt Ltd",
  "XYZ Ltd",
  "123 Inc",
  "Demo Company",
  "Global Systems",
  "Tech Solutions",
];

export const renewalPeriodOptions = [
  "6 Months",
  "12 Months",
  "24 Months",
  "36 Months",
];