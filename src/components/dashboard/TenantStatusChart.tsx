interface TenantStatusChartProps {
  active: number;
  inactive: number;
}

function TenantStatusChart({ active, inactive }: TenantStatusChartProps) {
  const total = active + inactive;
  const activePercentage = total === 0 ? 0 : Math.round((active / total) * 100);
  const inactivePercentage = total === 0 ? 0 : 100 - activePercentage;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <div>
        <h2 className="text-lg font-extrabold text-slate-900">Active vs Inactive Tenants</h2>
        <p className="mt-1 text-xs font-medium text-slate-500">Current tenant status distribution</p>
      </div>

      <div className="mt-7 flex items-center gap-7">
        <div
          className="relative h-36 w-36 shrink-0 rounded-full"
          style={{
            background: `conic-gradient(#10b981 0 ${activePercentage}%, #f43f5e ${activePercentage}% 100%)`,
          }}
          aria-label={`${active} active tenants and ${inactive} inactive tenants`}
          role="img"
        >
          <div className="absolute inset-[18px] flex flex-col items-center justify-center rounded-full bg-white">
            <span className="text-2xl font-extrabold text-slate-900">{total}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">Tenants</span>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-5">
          <StatusRow label="Active" value={active} percentage={activePercentage} dotClass="bg-emerald-500" />
          <StatusRow label="Inactive" value={inactive} percentage={inactivePercentage} dotClass="bg-rose-500" />
        </div>
      </div>
    </section>
  );
}

function StatusRow({
  label,
  value,
  percentage,
  dotClass,
}: {
  label: string;
  value: number;
  percentage: number;
  dotClass: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
          <span className="text-sm font-bold text-slate-700">{label}</span>
        </div>
        <span className="text-sm font-extrabold text-slate-900">{value}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${dotClass}`} style={{ width: `${percentage}%` }} />
      </div>
      <p className="mt-1 text-right text-[10px] font-bold text-slate-400">{percentage}%</p>
    </div>
  );
}

export default TenantStatusChart;
