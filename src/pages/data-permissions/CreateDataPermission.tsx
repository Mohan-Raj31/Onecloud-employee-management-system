import {
  useNavigate,
} from "react-router-dom";

import DataPermissionForm from "../../components/data-permissions/DataPermissionForm";

import {
  useCreateDataPermission,
} from "../../hooks/useDataPermissions";

import type {
  DataPermissionFormData,
} from "../../types";

function CreateDataPermission() {
  const navigate =
    useNavigate();

  const mutation =
    useCreateDataPermission();

  const handleSubmit = (
    data: DataPermissionFormData,
  ) => {
    mutation.mutate(
      data,
      {
        onSuccess: () =>
          navigate(
            "/data-permissions",
          ),
      },
    );
  };

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="mb-6">
        <h1 className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-[28px] font-extrabold text-transparent max-[650px]:text-[23px]">
          Create Data Permission
        </h1>

        <p className="mt-1 text-sm text-[#667085]">
          Create and configure
          a new data access
          policy
        </p>
      </div>

      <DataPermissionForm
        submitLabel="Save Policy"
        isSubmitting={
          mutation.isPending
        }
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate(
            "/data-permissions",
          )
        }
      />
    </div>
  );
}

export default CreateDataPermission;
