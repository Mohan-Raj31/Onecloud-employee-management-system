import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import EmployeeDetails from "../pages/EmployeeDetails";
import AddEmployee from "../pages/AddEmployee";
import EditEmployee from "../pages/EditEmployee";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/employees"
        element={<Employees />}
      />

      <Route
        path="/employees/add"
        element={<AddEmployee />}
      />

      <Route
        path="/employees/:id"
        element={<EmployeeDetails />}
      />

      <Route
        path="/employees/:id/edit"
        element={<EditEmployee />}
      />
    </Routes>
  );
}

export default AppRoutes;
