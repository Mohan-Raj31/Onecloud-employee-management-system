import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  usePermission,
} from "../../hooks/usePermissions";

function ViewPermission() {
  const navigate = useNavigate();

  const { id } = useParams();

  const permissionId = Number(id);

  const {
    data: permission,
    isLoading,
    isError,
  } = usePermission(
    permissionId,
  );

  if (isLoading) {
    return (
      <PageState title="Loading permission..." />
    );
  }

  if (isError || !permission) {
    return (
      <PageState
        title="Permission not found"
        actionLabel="Back to Permissions"
        onAction={() =>
          navigate("/permissions")
        }
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      {/* HEADER */}
      <div className="mb-6 flex items-start justify-between gap-4 max-[650px]:flex-col">
        <div>
          <h1 className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-[28px] font-extrabold text-transparent">
            View Permission
          </h1>

          <p className="mt-1 text-sm text-[#667085]">
            View permission configuration and access details
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${
            permission.status ===
            "Active"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {permission.status}
        </span>
      </div>

      {/* INFORMATION */}
      <InfoSection title="PERMISSION INFORMATION">
        <Info
          label="Permission Name"
          value={permission.name}
        />

        <Info
          label="Permission Code"
          value={permission.code}
        />

        <Info
          label="Module"
          value={permission.module}
        />

        <Info
          label="Permission Type"
          value={permission.type}
        />

        <Info
          label="Description"
          value={
            permission.description ||
            "-"
          }
          full
        />
      </InfoSection>

      {/* ACTIONS */}
      <InfoSection title="ACTION PERMISSIONS">
        <div className="col-span-2 grid grid-cols-4 gap-3 max-[800px]:grid-cols-2 max-[500px]:grid-cols-1">
          {[
            "View",
            "Create",
            "Update",
            "Delete",
            "Approve",
            "Import",
            "Export",
            "Print",
          ].map((action) => {
            const enabled =
              permission.actions.includes(
                action as never,
              );

            return (
              <div
                key={action}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                  enabled
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-md text-xs font-bold ${
                    enabled
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {enabled
                    ? "✓"
                    : "—"}
                </span>

                <span className="text-sm font-semibold text-slate-700">
                  {action}
                </span>
              </div>
            );
          })}
        </div>
      </InfoSection>

      {/* ASSIGNED ROLES */}
      <InfoSection title="ASSIGNED ROLES">
        <div className="col-span-2 flex items-center justify-between rounded-xl border border-[#d6deea] bg-[#f8faff] px-5 py-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              Assigned Roles
            </p>

            <p className="mt-1 text-2xl font-extrabold text-slate-800">
              {permission.assignedRoles}
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl border border-indigo-200 bg-indigo-50 px-5 py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-100"
          >
            View Assigned Roles
          </button>
        </div>
      </InfoSection>

      {/* SUMMARY */}
      <InfoSection title="PERMISSION SUMMARY">
        <Info
          label="Module"
          value={permission.module}
        />

        <Info
          label="Category"
          value={permission.type}
        />

        <Info
          label="Created By"
          value={permission.createdBy}
        />

        <Info
          label="Created Date"
          value={permission.createdAt}
        />
      </InfoSection>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pb-6 max-[500px]:flex-col">
        <button
          type="button"
          onClick={() =>
            navigate("/permissions")
          }
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/permissions/edit/${permission.id}`,
            )
          }
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3 text-sm font-bold text-white shadow-md"
        >
          Edit Permission
        </button>
      </div>
    </div>
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
    <section className="mb-6 rounded-2xl border border-[#dce4f2] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.06)] max-[650px]:p-4">
      <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-5 max-[650px]:grid-cols-1">
        {children}
      </div>
    </section>
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

function PageState({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="font-extrabold text-slate-800">
          {title}
        </p>

        {actionLabel &&
          onAction && (
            <button
              type="button"
              onClick={onAction}
              className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white"
            >
              {actionLabel}
            </button>
          )}
      </div>
    </div>
  );
}

export default ViewPermission;
