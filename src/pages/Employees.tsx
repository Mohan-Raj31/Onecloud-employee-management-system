import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EmployeeCard from "../components/employees/EmployeeCard";
import EmployeeSearch from "../components/employees/EmployeeSearch";
import EmployeeFilters from "../components/employees/EmployeeFilters";
import type { Employee, SetEmployees } from "../types";

interface EmployeesProps {
  employees: Employee[];
  setEmployees: SetEmployees;
}

function Employees({ employees, setEmployees }: EmployeesProps) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (confirmed) {
      setEmployees((previousEmployees) =>
        previousEmployees.filter((employee) => employee.id !== id),
      );
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || employee.department === department;

    const matchesStatus = status === "All" || employee.status === status;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  if (loading) {
    return (
      <div className="state-message">
        <h2>Loading employees...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-message">
        <h2>Something went wrong</h2>
        <p>Unable to load employees.</p>
      </div>
    );
  }

  return (
    <div className="employees-page">
      <div className="employees-header">
        <h1>Employees</h1>
        <button onClick={() => navigate("/employees/add")}>Add Employee</button>
      </div>

      <EmployeeSearch onSearch={setSearch} />

      <EmployeeFilters
        onDepartmentChange={setDepartment}
        onStatusChange={setStatus}
      />

      {filteredEmployees.length === 0 ? (
        <div className="state-message">
          <h2>No employees found</h2>
          <p>There are no employees matching your search or filters.</p>
        </div>
      ) : (
        <div className="employee-list">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Employees;
