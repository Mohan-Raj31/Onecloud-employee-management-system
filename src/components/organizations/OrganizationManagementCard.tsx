import type { ReactNode } from "react";

interface OrganizationManagementCardProps {
  label: string;
  description: string;
  icon: ReactNode;
}

function OrganizationManagementCard({
  label,
  description,
  icon,
}: OrganizationManagementCardProps) {
  return (
    <div className="rounded-[17px] border border-[#e5e7eb] bg-white p-[20px] shadow-[0_8px_25px_rgba(15,23,42,0.05)] transition-shadow duration-200 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </span>

        <div className="min-w-0">
          <h3 className="text-[15px] font-extrabold text-slate-800">
            {label}
          </h3>

          <p className="mt-1 text-[12px] font-medium leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrganizationManagementCard;
