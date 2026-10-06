import { roleData } from "../data/roles";

import type {
  Role,
  RoleFormData,
  RolePermission,
} from "../types";

const ROLES_STORAGE_KEY =
  "onecloud_roles_v1";

const PERMISSION_MODULES = [
  "Users",
  "Organizations",
  "Employees",
  "Reports",
  "Settings",
  "Roles",
  "Permissions",
  "Audit Logs",
];

const DEFAULT_MODULES = [
  "Dashboard",
  "User Management",
  "Organizations",
  "Employees",
  "Reports",
  "Settings",
  "Roles Management",
  "Permissions",
];

function clone<T>(value: T): T {
  return JSON.parse(
    JSON.stringify(value),
  ) as T;
}

function createDefaultPermissions(): RolePermission[] {
  return PERMISSION_MODULES.map(
    (module) => ({
      module,
      view: false,
      create: false,
      edit: false,
      delete: false,
    }),
  );
}

function normalizeRole(
  role: Partial<Role> & {
    permissions?: unknown;
    modules?: unknown;
    users?: unknown;
  },
  id: number,
): Role {
  const permissions = Array.isArray(
    role.permissions,
  )
    ? role.permissions
    : createDefaultPermissions();

  const modules = Array.isArray(
    role.modules,
  )
    ? role.modules
    : DEFAULT_MODULES.slice(
        0,
        typeof role.modules === "number"
          ? role.modules
          : 0,
      );

  return {
    id,
    name: role.name || "",
    code: role.code || "",
    type: role.type || "Custom Role",
    description:
      role.description || "",
    modules,
    permissions,
    users:
      typeof role.users === "number"
        ? role.users
        : 0,
    status:
      role.status || "Active",
    parentRole:
      role.parentRole || "",
    inheritPermissions:
      role.inheritPermissions || false,
    createdAt:
      role.createdAt ||
      new Date().toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        },
      ),
  };
}

function readRoles(): Role[] {
  const saved = localStorage.getItem(
    ROLES_STORAGE_KEY,
  );

  if (!saved) {
    const initialRoles =
      roleData.map((role) =>
        normalizeRole(
          role,
          role.id,
        ),
      );

    localStorage.setItem(
      ROLES_STORAGE_KEY,
      JSON.stringify(initialRoles),
    );

    return initialRoles;
  }

  try {
    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      throw new Error(
        "Invalid roles data",
      );
    }

    const normalizedRoles =
      parsed.map(
        (role: Partial<Role>) =>
          normalizeRole(
            role,
            Number(role.id),
          ),
      );

    localStorage.setItem(
      ROLES_STORAGE_KEY,
      JSON.stringify(normalizedRoles),
    );

    return normalizedRoles;
  } catch {
    const initialRoles =
      roleData.map((role) =>
        normalizeRole(
          role,
          role.id,
        ),
      );

    localStorage.setItem(
      ROLES_STORAGE_KEY,
      JSON.stringify(initialRoles),
    );

    return initialRoles;
  }
}

function writeRoles(roles: Role[]) {
  localStorage.setItem(
    ROLES_STORAGE_KEY,
    JSON.stringify(roles),
  );
}

export async function getRoles(): Promise<Role[]> {
  return clone(readRoles());
}

export async function getRole(
  id: number,
): Promise<Role> {
  const role = readRoles().find(
    (item) => item.id === id,
  );

  if (!role) {
    throw new Error(
      "Role not found",
    );
  }

  return clone(role);
}

export async function createRole(
  data: RoleFormData,
): Promise<Role> {
  const roles = readRoles();

  const nextId =
    Math.max(
      0,
      ...roles.map(
        (role) => role.id,
      ),
    ) + 1;

  const newRole: Role = {
    id: nextId,
    ...data,
    users: data.users || 0,
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

  writeRoles([
    newRole,
    ...roles,
  ]);

  return clone(newRole);
}

export async function updateRole(
  id: number,
  data: RoleFormData,
): Promise<Role> {
  const roles = readRoles();

  const existingRole = roles.find(
    (role) => role.id === id,
  );

  if (!existingRole) {
    throw new Error(
      "Role not found",
    );
  }

  const updatedRole: Role = {
    ...existingRole,
    ...data,
    id: existingRole.id,
    createdAt:
      existingRole.createdAt,
  };

  const updatedRoles =
    roles.map((role) =>
      role.id === id
        ? updatedRole
        : role,
    );

  writeRoles(updatedRoles);

  return clone(updatedRole);
}