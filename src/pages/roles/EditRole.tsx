import { useNavigate, useParams } from "react-router-dom";

import RolesForm from "../../components/roles/RolesForm";

import {
  useRole,
  useUpdateRole,
} from "../../hooks/useRoles";

import type { RoleFormData } from "../../types";

function EditRole() {
  const navigate = useNavigate();
  const { id } = useParams();

  const roleId = Number(id);

  const {
    data: role,
    isLoading,
    isError,
  } = useRole(roleId);

  const updateRole = useUpdateRole();

  if (isLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <p className="font-bold text-slate-700">
          Loading role...
        </p>
      </div>
    );
  }

  if (isError || !role) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="font-bold text-slate-800">
            Role not found
          </p>

          <button
            type="button"
            onClick={() => navigate("/roles")}
            className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white"
          >
            Back to Roles
          </button>
        </div>
      </div>
    );
  }

  const handleUpdate = (
    data: RoleFormData,
  ) => {
    updateRole.mutate(
      {
        id: role.id,
        data,
      },
      {
        onSuccess: () => {
          navigate("/roles");
        },
      },
    );
  };

  return (
    <section className="mx-auto w-full max-w-[1200px] pb-8">
      <div className="mb-7">
        <h1 className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-[30px] font-extrabold tracking-[-1px] text-transparent max-[650px]:text-[24px] max-[400px]:text-[21px]">
          Edit Role
        </h1>

        <p className="mt-1 text-sm font-medium text-[#667085]">
          Update role configuration and access details
        </p>
      </div>

      <RolesForm
        initialData={role}
        submitLabel={
          updateRole.isPending
            ? "Updating..."
            : "Update Role"
        }
        onSubmit={handleUpdate}
        onCancel={() => navigate("/roles")}
      />
    </section>
  );
}

export default EditRole;