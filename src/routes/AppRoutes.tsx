import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import EmployeeDetails from "../pages/EmployeeDetails";
import AddEmployee from "../pages/AddEmployee";
import EditEmployee from "../pages/EditEmployee";
import type { Employee, SetEmployees } from "../types";

interface AppRoutesProps {
  employees: Employee[];
  setEmployees: SetEmployees;
}

function AppRoutes({ employees, setEmployees }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard employees={employees} />} />
      <Route
        path="/employees"
        element={
          <Employees employees={employees} setEmployees={setEmployees} />
        }
      />
      <Route
        path="/employees/:id"
        element={<EmployeeDetails employees={employees} />}
      />
      <Route
        path="/employees/:id/edit"
        element={
          <EditEmployee employees={employees} setEmployees={setEmployees} />
        }
      />
      <Route
        path="/employees/add"
        element={
          <AddEmployee employees={employees} setEmployees={setEmployees} />
        }
      />
    </Routes>
  );
}

export default AppRoutes;
