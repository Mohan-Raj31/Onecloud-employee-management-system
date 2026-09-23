import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeCard from "../components/employees/EmployeeCard";
import EmployeeSearch from "../components/employees/EmployeeSearch";
import EmployeeFilters from "../components/employees/EmployeeFilters";
import { useEmployees } from "../hooks/useEmployees";

function Employees() {
  const navigate = useNavigate();

  const {
    employees,
    isLoading,
    isError,
    deleteEmployee,
    isDeleting,
  } = useEmployees();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (confirmed) {
      await deleteEmployee(id);
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || employee.department === department;

    const matchesStatus =
      status === "All" || employee.status === status;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  if (isLoading) {
    return (
      <div
        className="
          flex min-h-[330px] flex-col items-center justify-center
          rounded-[20px] border border-dashed border-[#cfd5df]
          bg-gradient-to-br from-white to-[#f8f9ff]
          p-10 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)]
        "
      >
        <h2 className="relative mb-[9px] text-[19px] font-bold text-[#344054]">
          <span
            className="
              mx-auto mb-[17px] block h-[30px] w-[30px]
              animate-spin rounded-full border-[3px]
              border-[#e0e7ff] border-t-[#4f46e5]
            "
          />
          Loading employees...
        </h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[330px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#cfd5df] bg-gradient-to-br from-white to-[#f8f9ff] p-10 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <h2 className="mb-[9px] text-[19px] font-bold text-[#344054]">
          Something went wrong
        </h2>

        <p className="max-w-[450px] text-[13px] leading-[1.6] text-[#667085]">
          Unable to load employees.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1450px]">
      <div
        className="
          mb-7 flex items-center justify-between gap-5
          max-[650px]:mb-[22px] max-[650px]:flex-col max-[650px]:items-stretch
        "
      >
        <h1 className="text-[31px] font-extrabold tracking-[-1px] text-[#0d2458] max-[650px]:text-[25px]">
          Employees
        </h1>

        <button
          onClick={() => navigate("/employees/add")}
          className="
            min-h-[45px] rounded-[10px] border-0
            bg-gradient-to-br from-[#4c51f5] to-[#2127d1]
            px-5 text-[15px] font-bold text-white
            shadow-[0_8px_20px_rgba(79,70,229,0.25)]
            transition-all duration-200
            hover:-translate-y-[2px]
            hover:shadow-[0_12px_27px_rgba(79,70,229,0.34)]
            max-[650px]:w-full
          "
        >
          Add Employee
        </button>
      </div>

      <EmployeeSearch onSearch={setSearch} />

      <EmployeeFilters
        onDepartmentChange={setDepartment}
        onStatusChange={setStatus}
      />

      {filteredEmployees.length === 0 ? (
        <div className="flex min-h-[330px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#cfd5df] bg-gradient-to-br from-white to-[#f8f9ff] p-10 text-center shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <h2 className="mb-[9px] text-[19px] font-bold text-[#344054]">
            No employees found
          </h2>

          <p className="max-w-[450px] text-[13px] leading-[1.6] text-[#667085]">
            There are no employees matching your search or filters.
          </p>
        </div>
      ) : (
        <div
          className="
            grid w-full grid-cols-3 gap-[22px]
            max-[1200px]:grid-cols-2
            max-[850px]:grid-cols-1
            max-[650px]:gap-[15px]
          "
        >
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
