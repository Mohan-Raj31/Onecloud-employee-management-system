import { permissionData } from "../data/permissions";

import type {
  Permission,
  PermissionFormData,
} from "../types";

const PERMISSIONS_STORAGE_KEY =
  "onecloud_permissions_v1";

function clone<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value),
  ) as T;
}

function readPermissions(): Permission[] {
  const saved = localStorage.getItem(
    PERMISSIONS_STORAGE_KEY,
  );

  if (!saved) {
    const initialPermissions =
      clone(permissionData);

    localStorage.setItem(
      PERMISSIONS_STORAGE_KEY,
      JSON.stringify(initialPermissions),
    );

    return initialPermissions;
  }

  try {
    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      throw new Error(
        "Invalid permission data",
      );
    }

    return parsed as Permission[];
  } catch {
    const initialPermissions =
      clone(permissionData);

    localStorage.setItem(
      PERMISSIONS_STORAGE_KEY,
      JSON.stringify(initialPermissions),
    );

    return initialPermissions;
  }
}

function writePermissions(
  permissions: Permission[],
) {
  localStorage.setItem(
    PERMISSIONS_STORAGE_KEY,
    JSON.stringify(permissions),
  );
}

export async function getPermissions(): Promise<
  Permission[]
> {
  return clone(readPermissions());
}

export async function getPermission(
  id: number,
): Promise<Permission> {
  const permission = readPermissions().find(
    (item) => item.id === id,
  );

  if (!permission) {
    throw new Error(
      "Permission not found",
    );
  }

  return clone(permission);
}

export async function createPermission(
  data: PermissionFormData,
): Promise<Permission> {
  const permissions =
    readPermissions();

  const nextId =
    Math.max(
      0,
      ...permissions.map(
        (permission) =>
          permission.id,
      ),
    ) + 1;

  const newPermission: Permission = {
    id: nextId,
    ...data,
    createdAt:
      new Date().toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        },
      ),
  };

  writePermissions([
    newPermission,
    ...permissions,
  ]);

  return clone(newPermission);
}

export async function updatePermission(
  id: number,
  data: PermissionFormData,
): Promise<Permission> {
  const permissions =
    readPermissions();

  const existingPermission =
    permissions.find(
      (permission) =>
        permission.id === id,
    );

  if (!existingPermission) {
    throw new Error(
      "Permission not found",
    );
  }

  const updatedPermission: Permission = {
    ...existingPermission,
    ...data,
    id: existingPermission.id,
    createdAt:
      existingPermission.createdAt,
    updatedAt:
      new Date().toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        },
      ),
  };

  const updatedPermissions =
    permissions.map(
      (permission) =>
        permission.id === id
          ? updatedPermission
          : permission,
    );

  writePermissions(
    updatedPermissions,
  );

  return clone(updatedPermission);
}
