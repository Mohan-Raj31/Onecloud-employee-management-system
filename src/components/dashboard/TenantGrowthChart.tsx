import type { TenantGrowthPoint } from "../../types";

interface TenantGrowthChartProps {
  data: TenantGrowthPoint[];
}

function TenantGrowthChart({ data }: TenantGrowthChartProps) {
  const width = 720;
  const height = 250;
  const padding = { top: 20, right: 20, bottom: 40, left: 42 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.map((point) => point.tenants), 1);

  const points = data.map((point, index) => {
    const x = padding.left + (index / Math.max(data.length - 1, 1)) * innerWidth;
    const y = padding.top + innerHeight - (point.tenants / maxValue) * innerHeight;
    return { ...point, x, y };
  });

  const path = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Tenant Growth</h2>
          <p className="mt-1 text-xs font-medium text-slate-500">Cumulative tenant registrations</p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-600">Last 6 months</span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[620px] w-full" role="img" aria-label="Tenant growth chart">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padding.top + innerHeight - ratio * innerHeight;
            return <line key={ratio} x1={padding.left} x2={width - padding.right} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="4 5" />;
          })}
          <path d={`${path} L ${points[points.length - 1]?.x ?? padding.left} ${padding.top + innerHeight} L ${points[0]?.x ?? padding.left} ${padding.top + innerHeight} Z`} fill="url(#area)" opacity="0.5" />
          <path d={path} fill="none" stroke="#4f46e5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((point) => (
            <g key={point.month}>
              <circle cx={point.x} cy={point.y} r="5" fill="#ffffff" stroke="#4f46e5" strokeWidth="3" />
              <text x={point.x} y={height - 12} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">{point.month}</text>
            </g>
          ))}
          <defs>
            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}

export default TenantGrowthChart;
