import {
  licenseManagementData,
} from "../data/licenses";

import type {
  License,
  LicenseStatus,
} from "../types";

const LICENSES_STORAGE_KEY =
  "onecloud_licenses_v1";

const clone = <T,>(value: T): T =>
  JSON.parse(JSON.stringify(value)) as T;

function readLicenses(): License[] {
  const saved = localStorage.getItem(
    LICENSES_STORAGE_KEY,
  );

  if (!saved) {
    const initial = clone(
      licenseManagementData,
    );

    localStorage.setItem(
      LICENSES_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }

  try {
    return JSON.parse(saved) as License[];
  } catch {
    const initial = clone(
      licenseManagementData,
    );

    localStorage.setItem(
      LICENSES_STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }
}

function writeLicenses(
  licenses: License[],
) {
  localStorage.setItem(
    LICENSES_STORAGE_KEY,
    JSON.stringify(licenses),
  );
}

function generateLicenseKey(
  licenseType: string,
  nextId: number,
) {
  const prefix =
    licenseType === "Enterprise"
      ? "ENT"
      : licenseType === "Professional"
        ? "PRO"
        : "STD";

  return `OC-${prefix}-2026-${String(
    nextId,
  ).padStart(3, "0")}`;
}

export async function getLicenses(): Promise<
  License[]
> {
  return clone(readLicenses());
}

export async function createLicense(
  data: Omit<
    License,
    "id" | "licenseKey" | "status"
  >,
): Promise<License> {
  const current = readLicenses();

  const nextId =
    Math.max(
      0,
      ...current.map(
        (license) => license.id,
      ),
    ) + 1;

  const newLicense: License = {
    id: nextId,
    licenseKey: generateLicenseKey(
      data.licenseType,
      nextId,
    ),
    organization: data.organization,
    licenseType: data.licenseType,
    activationDate: data.activationDate,
    expiryDate: data.expiryDate,
    renewalPeriod: data.renewalPeriod,
    status: "Active",
  };

  writeLicenses([
    newLicense,
    ...current,
  ]);

  return clone(newLicense);
}

export async function updateLicenseStatus(
  id: number,
  status: LicenseStatus,
): Promise<License> {
  const current = readLicenses();

  const existing = current.find(
    (license) => license.id === id,
  );

  if (!existing) {
    throw new Error("License not found");
  }

  const updatedLicense: License = {
    ...existing,
    status,
  };

  const updatedLicenses = current.map(
    (license) =>
      license.id === id
        ? updatedLicense
        : license,
  );

  writeLicenses(updatedLicenses);

  return clone(updatedLicense);
}

export async function renewLicense(
  id: number,
): Promise<License> {
  const current = readLicenses();

  const existing = current.find(
    (license) => license.id === id,
  );

  if (!existing) {
    throw new Error("License not found");
  }

  const currentExpiry = new Date(
    existing.expiryDate,
  );

  const renewalMonths =
    Number(
      existing.renewalPeriod.split(" ")[0],
    ) || 12;

  currentExpiry.setMonth(
    currentExpiry.getMonth() +
      renewalMonths,
  );

  const newExpiryDate =
    currentExpiry.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );

  const updatedLicense: License = {
    ...existing,
    expiryDate: newExpiryDate,
    status: "Active",
  };

  const updatedLicenses = current.map(
    (license) =>
      license.id === id
        ? updatedLicense
        : license,
  );

  writeLicenses(updatedLicenses);

  return clone(updatedLicense);
}
