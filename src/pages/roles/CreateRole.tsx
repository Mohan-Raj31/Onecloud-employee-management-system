import { useNavigate } from "react-router-dom";
import { useCreateRole } from "../../hooks/useRoles";
import RolesForm from "../../components/roles/RolesForm";
import type { RoleFormData } from "../../types";

const ROLES_STORAGE_KEY = "onecloud_roles_v1";

function CreateRole() {
  const navigate = useNavigate();

  const createRole = useCreateRole();

  const handleCreate = (data: RoleFormData) => {
    createRole.mutate(data, {
      onSuccess: () => {
        navigate("/roles");
      },
    });
  };

  return (
    <section className="mx-auto w-full max-w-[1200px] pb-8">
      <div className="mb-7">
        <h1 className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-[30px] font-extrabold tracking-[-1px] text-transparent max-[650px]:text-[24px] max-[400px]:text-[21px]">
          Create Role
        </h1>

        <p className="mt-1 text-sm font-medium text-[#667085]">
          Create and configure a new platform role
        </p>
      </div>

      <RolesForm
        submitLabel={
          createRole.isPending
            ? "Saving..."
            : "Save Role"
        }
        onSubmit={handleCreate}
        onCancel={() => navigate("/roles")}
      />
    </section>
  );
}

export default CreateRole;