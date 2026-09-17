import EmployeeForm from "../components/employees/EmployeeForm";
import type { Employee, SetEmployees } from "../types";

interface AddEmployeeProps {
  employees: Employee[];
  setEmployees: SetEmployees;
}

function AddEmployee({ employees, setEmployees }: AddEmployeeProps) {
  return (
    <div className="add-employee">
      <h1>Add Employee</h1>

      <EmployeeForm
        employees={employees}
        setEmployees={setEmployees}
      />
    </div>
  );
}

export default AddEmployee;
