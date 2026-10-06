interface RoleSummaryCardProps {
  title: string;
  value: number;
}

function RoleSummaryCard({
  title,
  value,
}: RoleSummaryCardProps) {
  return (
    <div className="rounded-[17px] border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_25px_rgba(15,23,42,0.05)]">
      <p className="text-sm font-bold text-slate-500">
        {title}
      </p>

      <p className="mt-3 text-[28px] font-extrabold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default RoleSummaryCard;
