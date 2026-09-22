import { useState, type ChangeEvent } from "react";

interface EmployeeSearchProps {
  onSearch: (value: string) => void;
}

function EmployeeSearch({ onSearch }: EmployeeSearchProps) {
  const [search, setSearch] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearch(value);
    onSearch(value);
  };

  return (
    <div
      className="
        relative mb-[18px] w-full rounded-[16px]
        border border-[#e7eaf1]
        bg-gradient-to-br from-white to-[#f8faff]
        p-5 px-[22px]
        shadow-[0_7px_25px_rgba(15,23,42,0.05)]
        max-[650px]:p-[17px]
      "
    >
      <label className="mb-[9px] block text-[14px] font-bold text-[#344054]">
        Search Employees
      </label>

      <div className="relative">
        <span
          className="
            pointer-events-none absolute left-[14px] top-1/2 z-[2]
            -translate-y-1/2 text-[22px] text-[#7c3aed]
            max-[650px]:left-[12px]
          "
        >
          ⌕
        </span>

        <input
          type="text"
          placeholder="Search by employee name..."
          value={search}
          onChange={handleChange}
          className="
            h-[47px] w-full rounded-[10px]
            border border-[#dfe3eb] bg-white
            px-4 pl-[43px] text-[13px] text-[#172033]
            outline-none
            shadow-[inset_0_1px_2px_rgba(15,23,42,0.02)]
            transition-all duration-200
            placeholder:text-[#98a2b3]
            hover:border-[#c7ccd8]
            focus:border-[#818cf8]
            focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)]
            max-[650px]:pl-[38px]
          "
        />
      </div>
    </div>
  );
}

export default EmployeeSearch;
