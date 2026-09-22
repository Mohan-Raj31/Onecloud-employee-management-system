import { useNavigate } from "react-router-dom";
import type { Employee } from "../../types";

interface EmployeeCardProps {
  employee: Employee;
  onDelete: (id: number) => void;
}

function EmployeeCard({ employee, onDelete }: EmployeeCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/employees/${employee.id}`);
  };

  return (
    <div
      className="
        group relative min-w-0 overflow-hidden rounded-[18px]
        border border-[#babbbc]
        bg-gradient-to-br from-white via-white to-[#f7f8ff]
        p-[25px]
        shadow-[0_8px_26px_rgba(15,23,42,0.06)]
        transition-all duration-300
        hover:-translate-y-[7px]
        hover:border-[#8a8a8a]
        hover:shadow-[0_20px_42px_rgba(15,23,42,0.11)]
        max-[650px]:p-[21px]
        max-[400px]:p-[18px]
        before:absolute before:left-0 before:top-0 before:h-1 before:w-full
        before:bg-gradient-to-r before:from-[#4f46e5] before:via-[#7c3aed] before:to-[#2563eb]
        before:opacity-0 before:transition-opacity before:duration-300
        group-hover:before:opacity-100
        after:absolute after:-right-[75px] after:-top-[75px]
        after:h-[150px] after:w-[150px] after:rounded-full
        after:bg-[radial-gradient(circle,rgba(99,102,241,0.11),transparent_70%)]
      "
    >
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          employee.name
        )}&size=100`}
        alt={employee.name}
        className="
          relative z-[2] mb-[18px] block h-[78px] w-[78px]
          rounded-[20px] border-4 border-[#eef2ff]
          bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff]
          shadow-[0_8px_20px_rgba(79,70,229,0.13)]
        "
      />

      <h2 className="relative z-[2] mb-2 text-[20px] font-extrabold tracking-[-0.4px] text-[#090e18]">
        {employee.name}
      </h2>

      <p className="relative z-[2] mb-[7px] text-[12px] font-bold leading-[1.5] text-[#271447]">
        EmpID: {employee.id}
      </p>

      <p className="relative z-[2] mb-[7px] text-[12px] font-semibold leading-[1.5] text-[#475467]">
        {employee.designation}
      </p>

      <p className="relative z-[2] mb-[9px] table-cell rounded-[7px] bg-[#eef2ff] px-[9px] py-[5px] text-[10px] font-bold text-[#4f46e5]">
        {employee.department}
      </p>

      <p className="relative z-[2] mt-1 inline-flex items-center rounded-[20px] bg-[#ecfdf3] px-[10px] py-[5px] text-[10px] font-bold text-[#047857]">
        {employee.status}
      </p>

      <div
        className="
          relative z-[3] mt-[21px] flex gap-[9px]
          border-t border-[#edf0f4] pt-[17px]
          max-[400px]:flex-col
        "
      >
        <button
          onClick={handleViewDetails}
          className="
            min-h-[38px] flex-1 rounded-[8px]
            border border-[#dfe5ff]
            bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff]
            text-[11px] font-bold text-[#4f46e5]
            transition-all duration-200
            hover:bg-gradient-to-br hover:from-[#4f46e5] hover:to-[#7c3aed]
            hover:text-white hover:shadow-[0_7px_17px_rgba(79,70,229,0.22)]
            max-[400px]:w-full
          "
        >
          View Details
        </button>

        <button
          onClick={() => onDelete(employee.id)}
          className="
            min-h-[38px] flex-1 rounded-[8px]
            border border-[#fee2e2]
            bg-gradient-to-br from-[#fff5f5] to-[#fef2f2]
            text-[11px] font-bold text-[#dc2626]
            transition-all duration-200
            hover:bg-gradient-to-br hover:from-[#ef4444] hover:to-[#dc2626]
            hover:text-white hover:shadow-[0_7px_17px_rgba(239,68,68,0.2)]
            max-[400px]:w-full
          "
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;
