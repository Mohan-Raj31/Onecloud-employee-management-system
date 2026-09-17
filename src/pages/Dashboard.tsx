import type { Employee } from "../types";

interface DashboardProps {
  employees: Employee[];
}

function Dashboard({ employees }: DashboardProps) {
  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const departments = [
    ...new Set(employees.map((employee) => employee.department))
  ];

  return (
    <div className="dashboard-content">
      <h1>Welcome to OneCloud</h1>
      <h1>Employee Management System</h1>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <p>{totalEmployees}</p>
        </div>

        <div className="stat-card">
          <h3>Active Employees</h3>
          <p>{activeEmployees}</p>
        </div>

        <div className="stat-card">
          <h3>Inactive Employees</h3>
          <p>{inactiveEmployees}</p>
        </div>

        <div className="stat-card">
          <h3>Departments</h3>
          <p>{departments.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
