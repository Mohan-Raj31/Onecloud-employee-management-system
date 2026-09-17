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
    return <h2>Employee not found</h2>;
  }

  return (
    <div className="add-employee">
      <h1>Edit Employee</h1>

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
