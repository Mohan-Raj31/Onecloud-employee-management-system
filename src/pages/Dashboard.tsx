import { useEmployees } from "../hooks/useEmployees";

function Dashboard() {
  const {
    employees = [],
    isLoading,
    isError,
  } = useEmployees();

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-[1450px]">
        <div
          className="
            flex min-h-[330px] flex-col items-center justify-center
            rounded-[20px] border border-dashed border-[#cfd5df]
            bg-gradient-to-br from-white to-[#f8f9ff]
            p-10 text-center
            shadow-[0_10px_30px_rgba(15,23,42,0.05)]
          "
        >
          <span
            className="
              mb-[17px] block h-[30px] w-[30px]
              animate-spin rounded-full border-[3px]
              border-[#e0e7ff] border-t-[#4f46e5]
            "
          />

          <h2 className="text-[19px] font-bold text-[#344054]">
            Loading dashboard...
          </h2>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-[1450px]">
        <div
          className="
            flex min-h-[330px] flex-col items-center justify-center
            rounded-[20px] border border-dashed border-[#cfd5df]
            bg-gradient-to-br from-white to-[#f8f9ff]
            p-10 text-center
            shadow-[0_10px_30px_rgba(15,23,42,0.05)]
          "
        >
          <h2 className="mb-[9px] text-[19px] font-bold text-[#344054]">
            Something went wrong
          </h2>

          <p className="max-w-[450px] text-[13px] leading-[1.6] text-[#667085]">
            Unable to load employee information.
          </p>
        </div>
      </div>
    );
  }

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active",
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive",
  ).length;

  const departments = [
    ...new Set(
      employees.map((employee) => employee.department),
    ),
  ];

  const stats = [
    ["Total Employees", totalEmployees],
    ["Active Employees", activeEmployees],
    ["Inactive Employees", inactiveEmployees],
    ["Departments", departments.length],
  ];

  return (
    <div className="mx-auto w-full max-w-[1450px]">
      <h1
        className="
          relative mb-8 text-[31px] font-extrabold
          tracking-[-1.1px] text-[#111827]
          after:mt-[10px] after:block after:h-1 after:w-12
          after:rounded-[20px]
          after:bg-gradient-to-r after:from-[#4f46e5]
          after:to-[#8b5cf6]
          max-[650px]:mb-6 max-[650px]:text-[25px]
        "
      >
        Welcome to OneCloud
      </h1>

      <h1
        className="
          relative mb-8 text-[31px] font-extrabold
          tracking-[-1.1px] text-[#111827]
          after:mt-[10px] after:block after:h-1 after:w-12
          after:rounded-[20px]
          after:bg-gradient-to-r after:from-[#4f46e5]
          after:to-[#8b5cf6]
          max-[650px]:mb-6 max-[650px]:text-[25px]
        "
      >
        Employee Management System
      </h1>

      <div
        className="
          grid w-full grid-cols-4 gap-5
          max-[1200px]:grid-cols-2
          max-[650px]:grid-cols-1
          max-[650px]:gap-[13px]
        "
      >
        {stats.map(([title, value]) => (
          <div
            key={title}
            className="
              relative flex min-h-[155px] flex-col
              justify-between overflow-hidden rounded-[18px]
              border border-white/80
              bg-gradient-to-br from-white via-[#f9faff] to-[#eef2ff]
              p-6
              shadow-[0_10px_30px_rgba(30,41,59,0.07)]
              transition-all duration-300
              hover:-translate-y-[7px]
              hover:shadow-[0_18px_42px_rgba(30,41,59,0.12)]
              before:absolute before:left-0 before:top-0
              before:h-1 before:w-full
              before:bg-gradient-to-r before:from-[#4f46e5]
              before:via-[#7c3aed] before:to-[#2563eb]
              after:absolute after:-bottom-[45px]
              after:-right-[35px] after:h-[125px]
              after:w-[125px] after:rounded-full
              after:bg-[radial-gradient(circle,rgba(99,102,241,0.12),transparent_70%)]
              max-[650px]:min-h-[135px]
              max-[650px]:p-5
            "
          >
            <h3
              className="
                relative z-[2] text-[12px] font-bold
                uppercase tracking-[0.8px] text-[#667085]
              "
            >
              {title}
            </h3>

            <p
              className="
                relative z-[2] text-[38px] font-extrabold
                leading-none tracking-[-1.5px]
                bg-gradient-to-br from-[#312e81]
                via-[#4f46e5] to-[#7c3aed]
                bg-clip-text text-transparent
                max-[650px]:text-[33px]
              "
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
