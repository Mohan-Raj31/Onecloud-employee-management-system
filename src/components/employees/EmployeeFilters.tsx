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
    <div className="employee-filters">
      <div>
        <label>Department</label>

        <select value={department} onChange={handleDepartmentChange}>
          <option value="All">All Departments</option>
          <option value="Development">Development</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="CRM">CRM</option>
        </select>
      </div>

      <div>
        <label>Status</label>

        <select value={status} onChange={handleStatusChange}>
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}

export default EmployeeFilters;
