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
    <div className="employee-search">
      <label>Search Employees</label>

      <input
        type="text"
        placeholder="Search by employee name..."
        value={search}
        onChange={handleChange}
      />
    </div>
  );
}

export default EmployeeSearch;
