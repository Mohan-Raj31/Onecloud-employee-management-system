import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../components/employees/EmployeeForm";
import { useEmployees } from "../hooks/useEmployees";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const employeeId = Number(id);

  const {
    employees,
    isLoading,
  } = useEmployees();

  if (isLoading) {
    return (
      <div className="flex min-h-[330px] items-center justify-center">
        <p className="text-[14px] font-semibold text-[#667085]">
          Loading employee...
        </p>
      </div>
    );
  }

  const employee = employees.find(
    (item) => item.id === employeeId,
  );

  if (!employee) {
    return (
      <div className="flex min-h-[330px] items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold text-[#344054]">
            Employee Not Found
          </h2>

          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="
              rounded-lg bg-[#4c51f5]
              px-5 py-2.5
              text-sm font-semibold text-white
              transition hover:bg-[#383ddf]
            "
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="mb-6">
        <h1 className="text-[30px] font-extrabold tracking-[-1px] bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-transparent max-[650px]:text-[25px]">
          Edit Employee
        </h1>
        <p className="mt-1 text-sm font-medium text-[#667085]">
          Update employee information and details.
        </p>
      </div>

      <EmployeeForm
        employee={employee}
        isEdit={true}
      />
    </div>
  );
}

export default EditEmployee;