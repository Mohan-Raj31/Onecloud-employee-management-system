import { useNavigate, useParams } from "react-router-dom";
import { useEmployees } from "../hooks/useEmployees";

function EmployeeDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    employees,
    isLoading,
    isError,
  } = useEmployees();

  const employee = employees.find(
    (item) => item.id === Number(id),
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[330px] items-center justify-center">
        <p className="text-[14px] font-semibold text-[#667085]">
          Loading employee...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[330px] items-center justify-center">
        <p className="text-[14px] font-semibold text-[#dc2626]">
          Unable to load employee details.
        </p>
      </div>
    );
  }

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

  const detailRows = [
    ["Employee ID:", employee.id],
    ["Email:", employee.email],
    ["Phone:", employee.phone],
    ["Department:", employee.department],
    ["Joining Date:", employee.joiningDate],
    ["Status:", employee.status],
  ];

  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <h1 className="mb-[27px] text-[30px] font-extrabold tracking-[-1px] text-[#111827] max-[650px]:mb-[22px] max-[650px]:text-[25px]">
        Employee Details
      </h1>

      <div
        className="
          relative overflow-hidden rounded-[22px]
          border border-[#e4e8f0]
          bg-gradient-to-br from-white via-white to-[#f4f6ff]
          p-[38px] text-center
          shadow-[0_15px_45px_rgba(15,23,42,0.08)]
          before:absolute before:left-0 before:right-0 before:top-0 before:h-[6px]
          before:bg-gradient-to-r before:from-[#312e81] before:via-[#4f46e5] before:to-[#2563eb]
          after:absolute after:-right-[110px] after:-top-[110px]
          after:h-[250px] after:w-[250px] after:rounded-full
          after:bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_70%)]
          max-[650px]:rounded-[17px] max-[650px]:p-[27px_18px]
        "
      >
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            employee.name,
          )}&size=150`}
          alt={employee.name}
          className="
            relative z-[2] mx-auto mb-[19px] block h-[125px] w-[125px]
            rounded-[30px] border-[5px] border-[#eef2ff]
            shadow-[0_12px_30px_rgba(79,70,229,0.16)]
            max-[650px]:h-[105px] max-[650px]:w-[105px]
          "
        />

        <h2 className="relative z-[2] mb-[7px] text-[25px] font-extrabold tracking-[-0.6px] text-[#111827] max-[650px]:text-[22px]">
          {employee.name}
        </h2>

        <p className="relative z-[2] mb-[25px] text-[13px] font-bold text-[#4f46e5]">
          {employee.designation}
        </p>

        {detailRows.map(([label, value]) => (
          <p
            key={label}
            className="
              relative z-[2] mx-auto mb-[10px] flex min-h-12
              max-w-[650px] items-center justify-between gap-5
              rounded-[9px] border border-[#edf0f4]
              bg-gradient-to-r from-[#f8fafc] to-[#f4f6ff]
              px-4 text-left text-[13px] leading-[1.6] text-[#667085]
              max-[650px]:min-h-[57px] max-[650px]:flex-col
              max-[650px]:items-start max-[650px]:justify-center
              max-[650px]:gap-[3px] max-[650px]:px-[13px] max-[650px]:py-[9px]
            "
          >
            <strong className="text-[12px] font-bold text-[#344054]">
              {label}
            </strong>

            <span>{value}</span>
          </p>
        ))}

        <div
          className="
            relative z-[4] mt-[26px] flex justify-center gap-[11px]
            border-t border-[#edf0f4] pt-[23px]
            max-[650px]:flex-col
          "
        >
          <button
            type="button"
            onClick={() =>
              navigate(`/employees/${employee.id}/edit`)
            }
            className="
              min-h-[43px] min-w-[145px] rounded-[9px]
              bg-gradient-to-br from-[#382fea] via-[#1416b5] to-[#3a14c5]
              px-[18px] text-[14px] font-bold text-white
              shadow-[0_8px_20px_rgba(79,70,229,0.22)]
              transition-all duration-200
              hover:-translate-y-[2px]
              hover:shadow-[0_12px_25px_rgba(79,70,229,0.3)]
              max-[650px]:w-full
            "
          >
            Edit Employee
          </button>

          <button
            type="button"
            onClick={() => navigate("/employees")}
            className="
              min-h-[43px] min-w-[145px] rounded-[9px]
              border border-[#dfe3eb] bg-white
              px-[18px] text-[14px] font-bold text-[#475467]
              transition-all duration-200
              hover:border-[#c7ccd5] hover:bg-[#f8fafc]
              max-[650px]:w-full
            "
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
