interface KpiCardProps {
  label: string;
  value: string | number;
  helper: string;
  icon: string;
  tone: "indigo" | "green" | "red" | "blue" | "amber";
}

const toneClasses = {
  indigo: "from-indigo-50 to-white text-indigo-600",
  green: "from-emerald-50 to-white text-emerald-600",
  red: "from-rose-50 to-white text-rose-600",
  blue: "from-sky-50 to-white text-sky-600",
  amber: "from-amber-50 to-white text-amber-600",
};

function KpiCard({ label, value, helper, icon, tone }: KpiCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.09)]">
      <div className={`absolute inset-0 bg-gradient-to-br ${toneClasses[tone]} opacity-70`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">{value}</p>
          <p className="mt-2 text-xs font-medium text-slate-500">{helper}</p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm ring-1 ring-slate-100">
          {icon}
        </span>
      </div>
    </div>
  );
}

export default KpiCard;
