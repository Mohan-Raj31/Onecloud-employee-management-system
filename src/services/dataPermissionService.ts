import { dataPermissionData } from "../data/dataPermissions";
import type {
  DataPermission,
  DataPermissionFormData,
} from "../types";

const STORAGE_KEY = "onecloud_data_permissions_v1";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function readDataPermissions(): DataPermission[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    const initial = clone(dataPermissionData);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }

  try {
    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid data permission data");
    }

    return parsed as DataPermission[];
  } catch {
    const initial = clone(dataPermissionData);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(initial),
    );

    return initial;
  }
}

function writeDataPermissions(
  items: DataPermission[],
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items),
  );
}

function today() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export async function getDataPermissions(): Promise<
  DataPermission[]
> {
  return clone(readDataPermissions());
}

export async function getDataPermission(
  id: number,
): Promise<DataPermission> {
  const item = readDataPermissions().find(
    (policy) => policy.id === id,
  );

  if (!item) {
    throw new Error("Data permission not found");
  }

  return clone(item);
}

export async function createDataPermission(
  data: DataPermissionFormData,
): Promise<DataPermission> {
  const items = readDataPermissions();

  const nextId =
    Math.max(
      0,
      ...items.map((item) => item.id),
    ) + 1;

  const newItem: DataPermission = {
    id: nextId,
    ...data,
    createdAt: today(),
  };

  writeDataPermissions([
    newItem,
    ...items,
  ]);

  return clone(newItem);
}

export async function updateDataPermission(
  id: number,
  data: DataPermissionFormData,
): Promise<DataPermission> {
  const items = readDataPermissions();

  const existing = items.find(
    (item) => item.id === id,
  );

  if (!existing) {
    throw new Error(
      "Data permission not found",
    );
  }

  const updated: DataPermission = {
    ...existing,
    ...data,
    id: existing.id,
    createdAt: existing.createdAt,
    updatedAt: today(),
  };

  writeDataPermissions(
    items.map((item) =>
      item.id === id
        ? updated
        : item,
    ),
  );

  return clone(updated);
}