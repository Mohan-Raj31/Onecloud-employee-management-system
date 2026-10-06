import type { Feature } from "../types";

export const featureManagementData: Feature[] = [
  {
    id: 1,
    name: "User Management",
    module: "Identity",
    licensePlan: "Enterprise",
    status: "Enabled",
    description:
      "Manage users, user accounts, and access across the platform.",
  },
  {
    id: 2,
    name: "Workflow Engine",
    module: "Workflow",
    licensePlan: "Enterprise",
    status: "Enabled",
    description:
      "Configure and manage platform workflow processes.",
  },
  {
    id: 3,
    name: "AI Assistant",
    module: "AI Services",
    licensePlan: "Premium",
    status: "Disabled",
    description:
      "Provide AI-powered assistance across supported platform modules.",
  },
  {
    id: 4,
    name: "Reports",
    module: "Analytics",
    licensePlan: "Standard",
    status: "Enabled",
    description:
      "Generate and manage platform reports and analytics.",
  },
  {
    id: 5,
    name: "API Access",
    module: "Integration",
    licensePlan: "Enterprise",
    status: "Enabled",
    description:
      "Allow external systems to integrate with the platform APIs.",
  },
  {
    id: 6,
    name: "Advanced Analytics",
    module: "Analytics",
    licensePlan: "Premium",
    status: "Enabled",
    description:
      "Provide advanced analytics and platform insights.",
  },
  {
    id: 7,
    name: "Notifications",
    module: "Communication",
    licensePlan: "Standard",
    status: "Enabled",
    description:
      "Manage platform notifications and user alerts.",
  },
  {
    id: 8,
    name: "Document Management",
    module: "Documents",
    licensePlan: "Enterprise",
    status: "Disabled",
    description:
      "Manage documents and files across the platform.",
  },
];