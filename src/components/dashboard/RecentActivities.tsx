import type { ActivityType, RecentActivity } from "../../types";

interface RecentActivitiesProps {
  activities: RecentActivity[];
}

const icons: Record<ActivityType, string> = {
  created: "＋",
  activated: "✓",
  updated: "↻",
  renewed: "⌁",
  deactivated: "−",
  deleted: "×",
};

const iconClasses: Record<ActivityType, string> = {
  created: "bg-indigo-50 text-indigo-600",
  activated: "bg-emerald-50 text-emerald-600",
  updated: "bg-sky-50 text-sky-600",
  renewed: "bg-amber-50 text-amber-600",
  deactivated: "bg-rose-50 text-rose-600",
  deleted: "bg-slate-100 text-slate-600",
};

function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <div className="mb-4">
        <h2 className="text-lg font-extrabold text-slate-900">Recent Activities</h2>
        <p className="mt-1 text-xs font-medium text-slate-500">Latest tenant platform events</p>
      </div>
      <div className="space-y-1">
        {activities.slice(0, 6).map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-slate-50">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${iconClasses[activity.type]}`}>
              {icons[activity.type]}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-700">{activity.message}</p>
              <p className="mt-0.5 truncate text-xs text-slate-500">{activity.tenantName}</p>
            </div>
            <span className="shrink-0 text-[10px] font-semibold text-slate-400">
              {new Date(activity.createdAt).toLocaleDateString(undefined, { day: "2-digit", month: "short" })}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentActivities;
