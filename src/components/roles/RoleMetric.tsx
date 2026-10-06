interface RoleMetricProps {
  label: string;
  value: number;
}

function RoleMetric({
  label,
  value,
}: RoleMetricProps) {
  return (
    <div className="rounded-xl bg-slate-50 px-4 py-3">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-lg font-extrabold text-slate-800">
        {value}
      </p>
    </div>
  );
}

export default RoleMetric;
