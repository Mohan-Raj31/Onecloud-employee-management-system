import {
  useNavigate,
  useParams,
} from "react-router-dom";

import type { Role } from "../../types";

import { useRole } from "../../hooks/useRoles";

function ViewRole() {
  const navigate = useNavigate();
  const { id } = useParams();

  const roleId = Number(id);

  const {
    data: role,
    isLoading,
    isError,
  } = useRole(roleId);

  if (isLoading) {
    return (
      <section className="flex min-h-[420px] items-center justify-center">
        <p className="font-bold text-slate-700">
          Loading role...
        </p>
      </section>
    );
  }

  if (isError || !role) {
    return (
      <section className="mx-auto w-full max-w-[1100px]">
        <div className="rounded-2xl border border-[#dce4f2] bg-white p-8 text-center shadow-[0_8px_25px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-bold text-slate-800">
            Role not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The requested role could not be found.
          </p>

          <button
            type="button"
            onClick={() => navigate("/roles")}
            className="mt-5 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-700"
          >
            Back to Roles
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1100px]">
      {/* PAGE HEADER */}
      <div className="mb-6 flex items-start justify-between gap-4 max-[650px]:flex-col">
        <div>
          <h1 className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-[28px] font-extrabold tracking-[-0.7px] text-transparent max-[650px]:text-[23px]">
            View Role
          </h1>

          <p className="mt-1 text-sm text-[#667085]">
            View role configuration and access details
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${
            role.status === "Active"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {role.status}
        </span>
      </div>

      {/* ROLE INFORMATION */}
      <InfoSection title="ROLE INFORMATION">
        <Info label="Role Name" value={role.name} />

        <Info label="Role Code" value={role.code} />

        <Info label="Role Type" value={role.type} />

        <Info label="Status" value={role.status} />

        <Info
          label="Description"
          value={role.description || "-"}
          full
        />
      </InfoSection>

      {/* MODULE ACCESS */}
      <InfoSection title="MODULE ACCESS">
        <div className="col-span-2 grid grid-cols-2 gap-3 max-[650px]:grid-cols-1">
          {role.modules.length > 0 ? (
            role.modules.map((module) => (
              <div
                key={module}
                className="flex items-center gap-3 rounded-xl border border-[#d6deea] bg-[#f8faff] px-4 py-3"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-600 text-xs font-bold text-white">
                  ✓
                </span>

                <span className="text-sm font-semibold text-slate-700">
                  {module}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No modules assigned.
            </p>
          )}
        </div>
      </InfoSection>

      {/* PERMISSIONS */}
      <InfoSection title="PERMISSIONS">
        <div className="col-span-2 overflow-x-auto rounded-xl border border-[#d6deea]">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-[0.04em] text-slate-500">
                <th className="px-4 py-3">
                  Module
                </th>

                <th className="px-4 py-3 text-center">
                  View
                </th>

                <th className="px-4 py-3 text-center">
                  Create
                </th>

                <th className="px-4 py-3 text-center">
                  Edit
                </th>

                <th className="px-4 py-3 text-center">
                  Delete
                </th>
              </tr>
            </thead>

            <tbody>
              {role.permissions.length > 0 ? (
                role.permissions.map((permission) => (
                  <tr
                    key={permission.module}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-4 py-3 text-sm font-bold text-slate-700">
                      {permission.module}
                    </td>

                    <PermissionCell
                      value={permission.view}
                    />

                    <PermissionCell
                      value={permission.create}
                    />

                    <PermissionCell
                      value={permission.edit}
                    />

                    <PermissionCell
                      value={permission.delete}
                    />
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-slate-500"
                  >
                    No permissions configured.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </InfoSection>

      {/* ASSIGNED USERS */}
      <InfoSection title="ASSIGNED USERS">
        <div className="col-span-2 flex items-center justify-between rounded-xl border border-[#d6deea] bg-[#f8faff] px-5 py-4 max-[500px]:items-start max-[500px]:gap-3 max-[500px]:flex-col">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Assigned Users
            </p>

            <p className="mt-1 text-2xl font-extrabold text-slate-800">
              {role.users}
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-100"
          >
            Manage Users
          </button>
        </div>
      </InfoSection>

      {/* ROLE HIERARCHY */}
      <InfoSection title="ROLE HIERARCHY">
        <Info
          label="Parent Role"
          value={
            role.parentRole ||
            "No Parent Role"
          }
        />

        <div>
          <p className="mb-2 text-sm font-semibold text-slate-600">
            Permission Inheritance
          </p>

          <div className="flex min-h-[46px] items-center gap-3 rounded-xl border border-[#d6deea] bg-[#f8faff] px-4">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-md text-xs font-bold ${
                role.inheritPermissions
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-300 bg-white text-transparent"
              }`}
            >
              ✓
            </span>

            <span className="text-sm font-medium text-slate-700">
              Inherit Permissions
            </span>
          </div>
        </div>
      </InfoSection>

      {/* CREATED DATE */}
      {role.createdAt && (
        <div className="mb-6 text-right">
          <p className="text-xs font-medium text-slate-400">
            Created on {role.createdAt}
          </p>
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pb-6 max-[500px]:flex-col">
        <button
          type="button"
          onClick={() => navigate("/roles")}
          className="rounded-xl border border-[#cbd5e1] bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(`/roles/edit/${role.id}`)
          }
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5"
        >
          Edit Role
        </button>
      </div>
    </section>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 rounded-2xl border border-[#dce4f2] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.06)] max-[650px]:p-4">
      <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-5 max-[650px]:grid-cols-1">
        {children}
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div
      className={
        full
          ? "col-span-2 max-[650px]:col-span-1"
          : ""
      }
    >
      <p className="mb-2 text-sm font-semibold text-slate-600">
        {label}
      </p>

      <div className="rounded-xl border border-[#d6deea] bg-[#f8faff] px-4 py-3 text-sm font-medium text-slate-800">
        {value}
      </div>
    </div>
  );
}

function PermissionCell({
  value,
}: {
  value: boolean;
}) {
  return (
    <td className="px-4 py-3 text-center">
      <span
        className={`inline-flex h-6 w-6 items-center justify-center rounded-md text-xs font-extrabold ${
          value
            ? "bg-emerald-50 text-emerald-600"
            : "bg-slate-100 text-slate-300"
        }`}
      >
        {value ? "✓" : "—"}
      </span>
    </td>
  );
}

export default ViewRole;