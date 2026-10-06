import type { ReactNode } from "react";

interface OrganizationOverviewCardProps {
  label: string;
  value: number;
  description: string;
  icon: ReactNode;
}

function OrganizationOverviewCard({
  label,
  value,
  description,
  icon,
}: OrganizationOverviewCardProps) {
  return (
    <div className="rounded-[17px] border border-[#e5e7eb] bg-gradient-to-br from-white to-[#f7f8ff] p-[20px] shadow-[0_8px_25px_rgba(15,23,42,0.05)]">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-bold text-[#667085]">
            {label}
          </p>

          <p className="mt-1 text-[11px] font-medium text-slate-400">
            {description}
          </p>
        </div>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </span>
      </div>

      <p className="text-[29px] font-extrabold text-[#312e81]">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export default OrganizationOverviewCard;