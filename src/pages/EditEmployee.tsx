import { useParams } from "react-router-dom";
import EmployeeForm from "../components/employees/EmployeeForm";
import type { Employee, SetEmployees } from "../types";

interface EditEmployeeProps {
  employees: Employee[];
  setEmployees: SetEmployees;
}

function EditEmployee({ employees, setEmployees }: EditEmployeeProps) {
  const { id } = useParams<{ id: string }>();

  const employee = employees.find(
    (employee) => employee.id === Number(id)
  );

  if (!employee) {
    return (
      <h2 className="text-[19px] font-bold text-[#344054]">
        Employee not found
      </h2>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1050px]">
      <h1 className="mb-[27px] text-[30px] font-extrabold tracking-[-1px] text-[#111827] max-[650px]:mb-[22px] max-[650px]:text-[25px]">
        Edit Employee
      </h1>

      <EmployeeForm
        employees={employees}
        setEmployees={setEmployees}
        employee={employee}
        isEdit={true}
      />
    </div>
  );
}

export default EditEmployee;
