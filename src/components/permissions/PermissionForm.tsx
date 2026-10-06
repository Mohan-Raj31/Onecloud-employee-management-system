import { useEffect, useState } from "react";

import type {
  Permission,
  PermissionAction,
  PermissionFormData,
} from "../../types";

interface PermissionFormProps {
  initialData?: Permission;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (
    data: PermissionFormData,
  ) => void;
  onCancel: () => void;
}

const modules = [
  "User Management",
  "Organization Management",
  "Employee Management",
  "Reports",
  "Settings",
  "Roles Management",
  "Permissions",
  "Audit Logs",
];

const permissionTypes = [
  "CRUD",
  "Approval",
  "Import / Export",
  "Read Only",
  "Custom",
] as const;

const actions: PermissionAction[] = [
  "View",
  "Create",
  "Update",
  "Delete",
  "Approve",
  "Import",
  "Export",
  "Print",
];

function PermissionForm({
  initialData,
  submitLabel,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: PermissionFormProps) {
  const [name, setName] =
    useState("");

  const [code, setCode] =
    useState("");

  const [module, setModule] =
    useState(modules[0]);

  const [type, setType] =
    useState<
      PermissionFormData["type"]
    >("CRUD");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState<
      PermissionFormData["status"]
    >("Active");

  const [selectedActions, setSelectedActions] =
    useState<PermissionAction[]>(
      ["View"],
    );

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setName(initialData.name);
    setCode(initialData.code);
    setModule(initialData.module);
    setType(initialData.type);
    setDescription(
      initialData.description,
    );
    setStatus(initialData.status);
    setSelectedActions(
      initialData.actions,
    );
  }, [initialData]);

  const toggleAction = (
    action: PermissionAction,
  ) => {
    setSelectedActions((current) =>
      current.includes(action)
        ? current.filter(
            (item) => item !== action,
          )
        : [...current, action],
    );
  };

  const handleSubmit = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (
      !name.trim() ||
      !code.trim() ||
      !module ||
      !type ||
      selectedActions.length === 0
    ) {
      return;
    }

    onSubmit({
      name: name.trim(),
      code: code.trim().toUpperCase(),
      module,
      type,
      description:
        description.trim(),
      actions: selectedActions,
      assignedRoles:
        initialData?.assignedRoles ?? 0,
      status,
      createdBy:
        initialData?.createdBy ??
        "Super Admin",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* PERMISSION INFORMATION */}
      <section className="rounded-2xl border border-[#dce4f2] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.06)] max-[650px]:p-4">
        <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
          PERMISSION INFORMATION
        </h2>

        <div className="grid grid-cols-2 gap-5 max-[650px]:grid-cols-1">
          <Field
            label="Permission Name"
            required
          >
            <input
              value={name}
              onChange={(event) =>
                setName(
                  event.target.value,
                )
              }
              placeholder="Employee - Create"
              className="w-full rounded-xl border border-[#d6deea] bg-[#f8faff] px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              required
            />
          </Field>

          <Field
            label="Permission Code"
            required
          >
            <input
              value={code}
              onChange={(event) =>
                setCode(
                  event.target.value,
                )
              }
              placeholder="EMP_CREATE"
              className="w-full rounded-xl border border-[#d6deea] bg-[#f8faff] px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              required
            />
          </Field>

          <Field
            label="Module"
            required
          >
            <select
              value={module}
              onChange={(event) =>
                setModule(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-[#d6deea] bg-[#f8faff] px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            >
              {modules.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field
            label="Permission Type"
            required
          >
            <select
              value={type}
              onChange={(event) =>
                setType(
                  event.target
                    .value as PermissionFormData["type"],
                )
              }
              className="w-full rounded-xl border border-[#d6deea] bg-[#f8faff] px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            >
              {permissionTypes.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field
            label="Description"
            full
          >
            <textarea
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value,
                )
              }
              maxLength={500}
              rows={4}
              placeholder="Describe what this permission allows..."
              className="w-full resize-none rounded-xl border border-[#d6deea] bg-[#f8faff] px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />
          </Field>

          <Field label="Status">
            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as PermissionFormData["status"],
                )
              }
              className="input"
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </Field>
        </div>
      </section>

      {/* ACTION PERMISSIONS */}
      <section className="rounded-2xl border border-[#dce4f2] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.06)] max-[650px]:p-4">
        <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
          ACTION PERMISSIONS
        </h2>

        <div className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1">
          {actions.map((action) => {
            const checked =
              selectedActions.includes(
                action,
              );

            return (
              <label
                key={action}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                  checked
                    ? "border-indigo-200 bg-indigo-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    toggleAction(
                      action,
                    )
                  }
                  className="h-4 w-4 accent-indigo-600"
                />

                <span className="text-sm font-semibold text-slate-700">
                  {action}
                </span>
              </label>
            );
          })}
        </div>

        {selectedActions.length ===
          0 && (
          <p className="mt-3 text-xs font-semibold text-rose-600">
            Select at least one action.
          </p>
        )}
      </section>

      {/* ASSIGNED ROLES */}
      <section className="rounded-2xl border border-[#dce4f2] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.06)] max-[650px]:p-4">
        <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
          ASSIGNED ROLES
        </h2>

        <div className="flex items-center justify-between rounded-xl border border-[#d6deea] bg-[#f8faff] px-5 py-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Currently Assigned Roles
            </p>

            <p className="mt-1 text-2xl font-extrabold text-slate-800">
              {initialData?.assignedRoles ??
                0}
            </p>
          </div>

          <span className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600">
            Managed from Roles
          </span>
        </div>
      </section>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pb-6 max-[500px]:flex-col">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            selectedActions.length ===
              0
          }
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Saving..."
            : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required = false,
  full = false,
  children,
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        full
          ? "col-span-2 max-[650px]:col-span-1"
          : ""
      }
    >
      <label className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
        {required && (
          <span className="ml-1 text-rose-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

export default PermissionForm;
