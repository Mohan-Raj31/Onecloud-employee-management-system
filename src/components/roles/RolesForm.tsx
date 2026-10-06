import { useState } from "react";
import type {
  RoleFormData,
  RolePermission,
  RoleType,
  RoleStatus,
} from "../../types";

interface RolesFormProps {
  initialData?: Partial<RoleFormData>;
  submitLabel?: string;
  onSubmit: (data: RoleFormData) => void;
  onCancel: () => void;
}

const modules = [
  "Dashboard",
  "User Management",
  "Organizations",
  "Employees",
  "Reports",
  "Settings",
  "Roles Management",
  "Permissions",
  "Audit Logs",
];

const permissionModules = [
  "Users",
  "Organizations",
  "Employees",
  "Reports",
  "Settings",
  "Roles",
  "Permissions",
  "Audit Logs",
];

function createDefaultPermissions(): RolePermission[] {
  return permissionModules.map((module) => ({
    module,
    view: false,
    create: false,
    edit: false,
    delete: false,
  }));
}

function RolesForm({
  initialData,
  submitLabel = "Save Role",
  onSubmit,
  onCancel,
}: RolesFormProps) {
  const [roleName, setRoleName] = useState(
    initialData?.name || "",
  );

  const [roleCode, setRoleCode] = useState(
    initialData?.code || "",
  );

  const [roleType, setRoleType] =
  useState<RoleType>(
    initialData?.type ||
      "Custom Role",
  );

  const [status, setStatus] = useState<
    "Active" | "Inactive"
  >(initialData?.status || "Active");

  const [description, setDescription] = useState(
    initialData?.description || "",
  );

  const [selectedModules, setSelectedModules] =
    useState<string[]>(
      initialData?.modules || [],
    );

  const [permissions, setPermissions] = useState<
    RolePermission[]
  >(
    initialData?.permissions?.length
      ? initialData.permissions
      : createDefaultPermissions(),
  );

  const [parentRole, setParentRole] = useState(
    initialData?.parentRole || "",
  );

  const [inheritPermissions, setInheritPermissions] =
    useState(
      initialData?.inheritPermissions || false,
    );

  const [error, setError] = useState("");

  const toggleModule = (module: string) => {
    setSelectedModules((current) =>
      current.includes(module)
        ? current.filter((item) => item !== module)
        : [...current, module],
    );
  };

  const togglePermission = (
    module: string,
    permission:
      | "view"
      | "create"
      | "edit"
      | "delete",
  ) => {
    setPermissions((current) =>
      current.map((item) =>
        item.module === module
          ? {
              ...item,
              [permission]: !item[permission],
            }
          : item,
      ),
    );
  };

  const handleSubmit = () => {
    if (!roleName.trim()) {
      setError("Please enter Role Name.");
      return;
    }

    if (!roleCode.trim()) {
      setError("Please enter Role Code.");
      return;
    }

    setError("");

    onSubmit({
      name: roleName.trim(),
      code: roleCode.trim(),
      type: roleType,
      status,
      description: description.trim(),
      modules: selectedModules,
      permissions,
      users:
  initialData?.users || 0,
      parentRole,
      inheritPermissions,
    });
  };

  return (
    <div className="w-full">
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {/* ROLE INFORMATION */}
      <FormSection title="ROLE INFORMATION">
        <div className="grid grid-cols-2 gap-5 max-[650px]:grid-cols-1">
          <Input
            label="Role Name"
            value={roleName}
            onChange={setRoleName}
            placeholder="Enter role name"
            required
          />

          <Input
            label="Role Code"
            value={roleCode}
            onChange={setRoleCode}
            placeholder="Example: HR_MANAGER"
            required
          />

          <Select
            label="Role Type"
            value={roleType}
            onChange={(value) => setRoleType(value as RoleType)}
            options={[
  "System Role",
  "Business Role",
  "Default Role",
  "Custom Role",
]}
          />

          <Select
            label="Status"
            value={status}
            onChange={(value) =>
              setStatus(
                value as "Active" | "Inactive",
              )
            }
            options={[
              "Active",
              "Inactive",
            ]}
          />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-bold text-slate-600">
            Description
          </label>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Enter role description"
            rows={4}
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </FormSection>

      {/* MODULE ACCESS */}
      <FormSection title="MODULE ACCESS">
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 max-[650px]:grid-cols-1">
          {modules.map((module) => (
            <label
              key={module}
              className="flex cursor-pointer items-center gap-3 rounded-lg bg-white px-4 py-3 transition hover:bg-indigo-50"
            >
              <input
                type="checkbox"
                checked={selectedModules.includes(
                  module,
                )}
                onChange={() =>
                  toggleModule(module)
                }
                className="h-4 w-4 accent-indigo-600"
              />

              <span className="text-sm font-semibold text-slate-700">
                {module}
              </span>
            </label>
          ))}
        </div>
      </FormSection>

      {/* PERMISSIONS */}
      <FormSection title="PERMISSIONS">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-5 py-4 text-xs font-extrabold uppercase tracking-wide text-slate-500">
                  Module
                </th>

                <th className="px-5 py-4 text-center text-xs font-extrabold uppercase tracking-wide text-slate-500">
                  View
                </th>

                <th className="px-5 py-4 text-center text-xs font-extrabold uppercase tracking-wide text-slate-500">
                  Create
                </th>

                <th className="px-5 py-4 text-center text-xs font-extrabold uppercase tracking-wide text-slate-500">
                  Edit
                </th>

                <th className="px-5 py-4 text-center text-xs font-extrabold uppercase tracking-wide text-slate-500">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              {permissions.map((permission) => (
                <tr
                  key={permission.module}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-5 py-4 text-sm font-bold text-slate-700">
                    {permission.module}
                  </td>

                  <PermissionCheckbox
                    checked={permission.view}
                    onChange={() =>
                      togglePermission(
                        permission.module,
                        "view",
                      )
                    }
                  />

                  <PermissionCheckbox
                    checked={permission.create}
                    onChange={() =>
                      togglePermission(
                        permission.module,
                        "create",
                      )
                    }
                  />

                  <PermissionCheckbox
                    checked={permission.edit}
                    onChange={() =>
                      togglePermission(
                        permission.module,
                        "edit",
                      )
                    }
                  />

                  <PermissionCheckbox
                    checked={permission.delete}
                    onChange={() =>
                      togglePermission(
                        permission.module,
                        "delete",
                      )
                    }
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FormSection>

      {/* ASSIGNED USERS */}
      <FormSection title="ASSIGNED USERS">
        <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-4 max-[650px]:flex-col max-[650px]:items-start">
          <div>
            <p className="text-sm font-bold text-slate-700">
              Assigned Users
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Current users assigned to this role
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-slate-800">
              {initialData?.users || 0}
            </span>

            <button
              type="button"
              className="rounded-lg border border-indigo-200 bg-white px-4 py-2 text-sm font-bold text-indigo-600 transition hover:bg-indigo-50"
            >
              Assign
            </button>
          </div>
        </div>
      </FormSection>

      {/* ROLE HIERARCHY */}
      <FormSection title="ROLE HIERARCHY">
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
          <label className="mb-2 block text-sm font-bold text-slate-600">
            Parent Role
          </label>

          <select
            value={parentRole}
            onChange={(event) =>
              setParentRole(event.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">
              Select Parent Role
            </option>

            <option value="System Admin">
              System Admin
            </option>

            <option value="HR Manager">
              HR Manager
            </option>

            <option value="Manager">
              Manager
            </option>

            <option value="Employee">
              Employee
            </option>
          </select>

          <label className="mt-5 flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={inheritPermissions}
              onChange={(event) =>
                setInheritPermissions(
                  event.target.checked,
                )
              }
              className="h-4 w-4 accent-indigo-600"
            />

            <span className="text-sm font-semibold text-slate-700">
              Inherit Permissions
            </span>
          </label>
        </div>
      </FormSection>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-6 max-[500px]:flex-col">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-2xl border border-[#dce4f2] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.05)] max-[650px]:p-4">
      <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
        {title}
      </h2>

      {children}
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-600">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-600">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function PermissionCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <td className="px-5 py-4 text-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-indigo-600"
      />
    </td>
  );
}

export default RolesForm;
