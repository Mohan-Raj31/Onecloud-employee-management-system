import type { PlatformHealth as PlatformHealthData } from "../../../types";

interface PlatformHealthProps {
  health: PlatformHealthData;
}

function HealthRow({ label, value, progress, tone = "green" }: { label: string; value: string; progress?: number; tone?: "green" | "blue" | "amber" }) {
  const dot = tone === "green" ? "bg-emerald-500" : tone === "blue" ? "bg-sky-500" : "bg-amber-500";

  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`h-2.5 w-2.5 rounded-full ${dot} shadow-[0_0_0_4px_rgba(16,185,129,0.08)]`} />
          <span className="text-sm font-semibold text-slate-700">{label}</span>
        </div>
        <span className="text-xs font-bold text-slate-500">{value}</span>
      </div>
      {progress !== undefined && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

function PlatformHealth({ health }: PlatformHealthProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <div className="mb-4">
        <h2 className="text-lg font-extrabold text-slate-900">Platform Health</h2>
        <p className="mt-1 text-xs font-medium text-slate-500">Live platform service indicators</p>
      </div>
      <div className="space-y-2.5">
        <HealthRow label="API Gateway" value={health.apiGateway} />
        <HealthRow label="Database" value={health.database} tone="blue" />
        <HealthRow label="Server" value={health.server} />
        <HealthRow label="Storage" value={`${health.storage}%`} progress={health.storage} tone="amber" />
        <HealthRow label="CPU Usage" value={`${health.cpu}%`} progress={health.cpu} tone="blue" />
        <HealthRow label="Memory" value={`${health.memory}%`} progress={health.memory} />
      </div>
    </section>
  );
}

export default PlatformHealth;
