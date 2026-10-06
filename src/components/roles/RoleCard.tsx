import type { Role, RoleStatus } from "../../types";

import RoleMetric from "./RoleMetric";

interface RoleCardProps {
  role: Role;
  onView: () => void;
  onEdit: () => void;
}

function RoleCard({
  role,
  onView,
  onEdit,
}: RoleCardProps) {
  const statusStyle =
    role.status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-rose-50 text-rose-700";

  return (
    <article className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-4 max-[650px]:flex-col">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg">
            🛡
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 max-[500px]:flex-col max-[500px]:items-start">
              <h3 className="truncate text-base font-extrabold text-slate-800">
                {role.name}
              </h3>

              <StatusBadge
                status={role.status}
                className={statusStyle}
              />
            </div>

            <p className="mt-1 text-xs font-bold tracking-wide text-slate-400">
              {role.code}
            </p>

            <p className="mt-1 text-xs font-medium text-slate-500">
              {role.type} • {role.users}{" "}
              {role.users === 1 ? "User" : "Users"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 max-[650px]:w-full">
          <button
            type="button"
            onClick={onView}
            className="rounded-lg px-3 py-1.5 text-xs font-bold text-indigo-600 transition hover:bg-indigo-50"
          >
            View
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:bg-slate-100"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4 max-[500px]:grid-cols-1">
  <RoleMetric
    label="Permissions"
    value={role.permissions.length}
  />

  <RoleMetric
    label="Modules"
    value={role.modules.length}
  />

  <RoleMetric
    label="Assigned Users"
    value={role.users}
  />
</div>
    </article>
  );
}

function StatusBadge({
  status,
  className,
}: {
  status: RoleStatus;
  className: string;
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold ${className}`}
    >
      {status}
    </span>
  );
}

export default RoleCard;
