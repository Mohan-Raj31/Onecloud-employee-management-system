import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/employees/Employees";
import EmployeeDetails from "../pages/employees/EmployeeDetails";
import AddEmployee from "../pages/employees/AddEmployee";
import EditEmployee from "../pages/employees/EditEmployee";

import Tenants from "../pages/tenants/Tenants";
import CreateTenant from "../pages/tenants/CreateTenant";
import EditTenant from "../pages/tenants/EditTenant";
import TenantDetails from "../pages/tenants/TenantDetails";

import Layout from "../components/layout/Layout";

import Organizations from "../pages/organizations/Organizations";
import CreateOrganization from "../pages/organizations/CreateOrganization";
import ViewOrganization from "../pages/organizations/ViewOrganization";
import EditOrganization from "../pages/organizations/EditOrganization";

import Users from "../pages/users/Users";
import CreateUser from "../pages/users/CreateUser";
import ViewUser from "../pages/users/ViewUser";
import EditUser from "../pages/users/EditUser";

import Roles from "../pages/roles/Roles";
import CreateRole from "../pages/roles/CreateRole";
import ViewRole from "../pages/roles/ViewRole";
import EditRole from "../pages/roles/EditRole";

import Permissions from "../pages/permissions/Permissions";
import CreatePermission from "../pages/permissions/CreatePermission";
import ViewPermission from "../pages/permissions/ViewPermission";
import EditPermission from "../pages/permissions/EditPermission";

import DataPermissions from "../pages/data-permissions/DataPermissions";
import CreateDataPermission from "../pages/data-permissions/CreateDataPermission";
import ViewDataPermission from "../pages/data-permissions/ViewDataPermission";
import EditDataPermission from "../pages/data-permissions/EditDataPermission";

import PlatformConfiguration from "../pages/PlatformConfiguration";

import FeaturesManagement from "../pages/FeaturesManagement";

import LicenseManagement from "../pages/licenses/LicenseManagement";
import CreateLicense from "../pages/licenses/CreateLicense";

import GlobalSettings from "../pages/global-settings/GlobalSettings";

import AuditLogs from "../pages/audit-logs/AuditLogs";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/employees/:id/edit" element={<EditEmployee />} />

        <Route path="/tenants" element={<Tenants />} />
        <Route path="/tenants/new" element={<CreateTenant />} />
        <Route path="/tenants/:id" element={<TenantDetails />} />
        <Route path="/tenants/:id/edit" element={<EditTenant />} />

        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/create" element={<CreateOrganization />} />
        <Route path="/organizations/:id" element={<ViewOrganization />} />
        <Route path="/organizations/:id/edit" element={<EditOrganization />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/create" element={<CreateUser />} />
        <Route path="/users/view/:id" element={<ViewUser />} />
        <Route path="/users/edit/:id" element={<EditUser />} />

        <Route path="/roles" element={<Roles />} />
        <Route path="/roles/create" element={<CreateRole />} />
        <Route path="/roles/view/:id" element={<ViewRole />} />
        <Route path="/roles/edit/:id" element={<EditRole />} />

        <Route path="/permissions" element={<Permissions />} />
        <Route path="/permissions/create" element={<CreatePermission />} />
        <Route path="/permissions/view/:id" element={<ViewPermission />} />
        <Route path="/permissions/edit/:id" element={<EditPermission />} />

        <Route path="/data-permissions" element={<DataPermissions />} />
        <Route
          path="/data-permissions/create"
          element={<CreateDataPermission />}
        />
        <Route
          path="/data-permissions/view/:id"
          element={<ViewDataPermission />}
        />
        <Route
          path="/data-permissions/edit/:id"
          element={<EditDataPermission />}
        />

        <Route
          path="/platform-configuration"
          element={<PlatformConfiguration />}
        />

        <Route path="/features-management" element={<FeaturesManagement />} />

        <Route path="/license-management" element={<LicenseManagement />} />
        <Route path="/license-management/create" element={<CreateLicense />} />

        <Route path="/global-settings" element={<GlobalSettings />} />

        <Route path="/audit-logs" element={<AuditLogs />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRoutes;
