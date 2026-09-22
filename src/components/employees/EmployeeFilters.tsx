import { useState, type ChangeEvent } from "react";

interface EmployeeFiltersProps {
  onDepartmentChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

function EmployeeFilters({
  onDepartmentChange,
  onStatusChange
}: EmployeeFiltersProps) {
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");

  const handleDepartmentChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setDepartment(value);
    onDepartmentChange(value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatus(value);
    onStatusChange(value);
  };

  return (
    <div
      className="
        mb-[25px] flex flex-wrap items-end gap-[15px]
        rounded-[16px] border border-[#e7eaf1]
        bg-gradient-to-br from-white to-[#f8faff]
        p-5 px-[22px]
        shadow-[0_7px_25px_rgba(15,23,42,0.05)]
        max-[650px]:flex-col max-[650px]:items-stretch max-[650px]:p-4
      "
    >
      <div className="flex min-w-[190px] flex-col gap-2 max-[650px]:min-w-full">
        <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#344054]">
          Department
        </label>
        <select
          value={department}
          onChange={handleDepartmentChange}
          className="
            h-[43px] w-full cursor-pointer rounded-[9px]
            border border-[#dfe3eb] bg-white px-[13px]
            text-[12px] font-semibold text-[#344054] outline-none
            transition-all duration-200
            hover:border-[#bfc5d1]
            focus:border-[#818cf8]
            focus:shadow-[0_0_0_4px_rgba(99,102,241,0.09)]
          "
        >
          <option value="All">All Departments</option>
          <option value="Development">Development</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="CRM">CRM</option>
        </select>
      </div>

      <div className="flex min-w-[190px] flex-col gap-2 max-[650px]:min-w-full">
        <label className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#344054]">
          Status
        </label>
        <select
          value={status}
          onChange={handleStatusChange}
          className="
            h-[43px] w-full cursor-pointer rounded-[9px]
            border border-[#dfe3eb] bg-white px-[13px]
            text-[12px] font-semibold text-[#344054] outline-none
            transition-all duration-200
            hover:border-[#bfc5d1]
            focus:border-[#818cf8]
            focus:shadow-[0_0_0_4px_rgba(99,102,241,0.09)]
          "
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}

export default EmployeeFilters;
