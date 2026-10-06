import type {
  Organization,
  OrganizationManagementData,
} from "../types";

export const organizationManagementData: OrganizationManagementData = {
  stats: {
    companies: 12,
    businessUnits: 8,
    departments: 24,
    branches: 15,
    costCentres: 18,
    locations: 10,
  },

  organizations: [
    {
      id: 1,
      name: "ABC Technologies",
      code: "ABC001",
      businessType: "IT Services",
      location: "Hyderabad",
      status: "Active",
      createdAt: "30-Jul-2026",
    },
    {
      id: 2,
      name: "XYZ Industries",
      code: "XYZ002",
      businessType: "Manufacturing",
      location: "Bengaluru",
      status: "Active",
      createdAt: "28-Jul-2026",
    },
    {
      id: 3,
      name: "Global Solutions",
      code: "GLO003",
      businessType: "Consulting",
      location: "Chennai",
      status: "Inactive",
      createdAt: "25-Jul-2026",
    },
    {
      id: 4,
      name: "NextGen Systems",
      code: "NGS004",
      businessType: "IT Services",
      location: "Pune",
      status: "Active",
      createdAt: "22-Jul-2026",
    },
    {
      id: 5,
      name: "Prime Manufacturing",
      code: "PRM005",
      businessType: "Manufacturing",
      location: "Chennai",
      status: "Active",
      createdAt: "20-Jul-2026",
    },
  ],
};

export const organizationOverviewCards = [
  {
    key: "companies",
    label: "Total Companies",
    description: "Registered organizations",
  },
  {
    key: "businessUnits",
    label: "Business Units",
    description: "Configured business divisions",
  },
  {
    key: "departments",
    label: "Departments",
    description: "Configured departments",
  },
  {
    key: "branches",
    label: "Branches",
    description: "Operational branches",
  },
  {
    key: "costCentres",
    label: "Cost Centers",
    description: "Configured cost centers",
  },
  {
    key: "locations",
    label: "Locations",
    description: "Configured locations",
  },
] as const;

export const organizationManagementCards = [
  {
    key: "company",
    label: "Company Setup",
    description: "Company information and registration",
  },
  {
    key: "businessUnits",
    label: "Business Units",
    description: "Manage business divisions",
  },
  {
    key: "departments",
    label: "Departments",
    description: "Manage functional departments",
  },
  {
    key: "branches",
    label: "Branches",
    description: "Manage organization branches",
  },
  {
    key: "costCentres",
    label: "Cost Centres",
    description: "Manage cost allocation areas",
  },
  {
    key: "locations",
    label: "Locations",
    description: "Manage business locations",
  },
] as const;

export const organizationFilterOptions = {
  statuses: ["All status", "Active", "Inactive"],
  businessTypes: [
    "All business Types ",
    "IT Services",
    "Manufacturing",
    "Consulting",
  ],
};

export const organizationLocations = [
  "All Locations",
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Pune",
];