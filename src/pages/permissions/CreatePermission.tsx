import { useNavigate } from "react-router-dom";

import PermissionForm from "../../components/permissions/PermissionForm";

import {
  useCreatePermission,
} from "../../hooks/usePermissions";

import type {
  PermissionFormData,
} from "../../types";

function CreatePermission() {
  const navigate = useNavigate();

  const createMutation =
    useCreatePermission();

  const handleSubmit = (
    data: PermissionFormData,
  ) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        navigate("/permissions");
      },
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="mb-6">
        <h1 className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-[28px] font-extrabold text-transparent">
          Create Permission
        </h1>

        <p className="mt-1 text-sm text-[#667085]">
          Create and configure a new platform permission
        </p>
      </div>

      <PermissionForm
        submitLabel="Save Permission"
        isSubmitting={
          createMutation.isPending
        }
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate("/permissions")
        }
      />
    </div>
  );
}

export default CreatePermission;
