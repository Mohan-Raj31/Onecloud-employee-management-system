import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import EmployeeDetails from "../pages/EmployeeDetails";
import AddEmployee from "../pages/AddEmployee";
import EditEmployee from "../pages/EditEmployee";
import Tenants from "../pages/Tenants";
import CreateTenant from "../pages/CreateTenant";
import EditTenant from "../pages/EditTenant";
import TenantDetails from "../pages/TenantDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/employees" element={<Employees />} />
      <Route path="/employees/add" element={<AddEmployee />} />
      <Route path="/employees/:id" element={<EmployeeDetails />} />
      <Route path="/employees/:id/edit" element={<EditEmployee />} />

      <Route path="/tenants" element={<Tenants />} />
      <Route path="/tenants/new" element={<CreateTenant />} />
      <Route path="/tenants/:id" element={<TenantDetails />} />
      <Route path="/tenants/:id/edit" element={<EditTenant />} />

      {/* Backward-compatible redirects for the previous route structure. */}
      <Route path="/super-admin/dashboard" element={<Navigate to="/dashboard" replace />} />
      <Route path="/super-admin/tenants" element={<Navigate to="/tenants" replace />} />
      <Route path="/super-admin/tenants/new" element={<Navigate to="/tenants/new" replace />} />
      <Route path="/super-admin/tenants/:id" element={<TenantDetails />} />
      <Route path="/super-admin/tenants/:id/edit" element={<EditTenant />} />

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
