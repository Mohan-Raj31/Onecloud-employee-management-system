import EmployeeForm from "../components/employees/EmployeeForm";
import type { Employee, SetEmployees } from "../types";

interface AddEmployeeProps {
  employees: Employee[];
  setEmployees: SetEmployees;
}

function AddEmployee({ employees, setEmployees }: AddEmployeeProps) {
  return (
    <div className="mx-auto w-full max-w-[1050px]">
      <h1 className="mb-[27px] text-[30px] font-extrabold tracking-[-1px] text-[#111827]
       max-[650px]:mb-[22px] max-[650px]:text-[25px]">
        Add Employee
      </h1>

      <EmployeeForm employees={employees} setEmployees={setEmployees} />
    </div>
  );
}

export default AddEmployee;
