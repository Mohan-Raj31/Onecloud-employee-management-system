import EmployeeForm from "../components/employees/EmployeeForm";

function AddEmployee() {
  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="mb-6">
        <h1 className="text-[30px] font-extrabold tracking-[-1px] bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-transparent max-[650px]:text-[25px]">
          Add Employee
        </h1>
        <p className="mt-1 text-sm font-medium text-[#667085]">
          Add a new employee to the organization.
        </p>
      </div>
      <EmployeeForm isEdit={false} />
    </div>
  );
}

export default AddEmployee;
