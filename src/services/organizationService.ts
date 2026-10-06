import {
  organizationManagementData,
} from "../data/organizations";

import type {
  Organization,
  OrganizationManagementData,
} from "../types";

const ORGANIZATIONS_STORAGE_KEY =
  "onecloud_organizations_v1";

const clone = <T,>(value: T): T =>
  JSON.parse(JSON.stringify(value)) as T;

function readOrganizations(): Organization[] {
  const saved = localStorage.getItem(
    ORGANIZATIONS_STORAGE_KEY,
  );

  if (!saved) {
    const initial = clone(
      organizationManagementData.organizations,
    );

    localStorage.setItem(
      ORGANIZATIONS_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }

  try {
    return JSON.parse(saved) as Organization[];
  } catch {
    const initial = clone(
      organizationManagementData.organizations,
    );

    localStorage.setItem(
      ORGANIZATIONS_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }
}

function writeOrganizations(
  organizations: Organization[],
) {
  localStorage.setItem(
    ORGANIZATIONS_STORAGE_KEY,
    JSON.stringify(organizations),
  );
}

export async function getOrganizationManagementData(): Promise<OrganizationManagementData> {
  return {
    stats: {
      ...organizationManagementData.stats,
      companies: readOrganizations().length,
    },

    organizations: clone(readOrganizations()),
  };
}

export async function getOrganization(
  id: number,
): Promise<Organization> {
  const organization = readOrganizations().find(
    (item) => item.id === id,
  );

  if (!organization) {
    throw new Error("Organization not found");
  }

  return clone(organization);
}

export async function createOrganization(
  data: Omit<Organization, "id" | "createdAt">,
): Promise<Organization> {
  const current = readOrganizations();

  const normalizedCode = data.code
    .trim()
    .toUpperCase();

  const duplicateCode = current.some(
    (organization) =>
      organization.code.toUpperCase() ===
      normalizedCode,
  );

  if (duplicateCode) {
    throw new Error(
      "Organization code already exists",
    );
  }

  const nextId =
    Math.max(
      0,
      ...current.map(
        (organization) => organization.id,
      ),
    ) + 1;

  const newOrganization: Organization = {
    id: nextId,
    ...data,
    code: normalizedCode,
    createdAt: new Date().toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    ),
  };

  writeOrganizations([
    newOrganization,
    ...current,
  ]);

  return clone(newOrganization);
}

export async function updateOrganization(
  id: number,
  data: Omit<Organization, "id" | "createdAt">,
): Promise<Organization> {
  const current = readOrganizations();

  const existing = current.find(
    (organization) => organization.id === id,
  );

  if (!existing) {
    throw new Error("Organization not found");
  }

  const normalizedCode = data.code
    .trim()
    .toUpperCase();

  const duplicateCode = current.some(
    (organization) =>
      organization.id !== id &&
      organization.code.toUpperCase() ===
        normalizedCode,
  );

  if (duplicateCode) {
    throw new Error(
      "Organization code already exists",
    );
  }

  const updatedOrganization: Organization = {
    ...existing,
    ...data,
    code: normalizedCode,
  };

  const updatedOrganizations = current.map(
    (organization) =>
      organization.id === id
        ? updatedOrganization
        : organization,
  );

  writeOrganizations(updatedOrganizations);

  return clone(updatedOrganization);
}
