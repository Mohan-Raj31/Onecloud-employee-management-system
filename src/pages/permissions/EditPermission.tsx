import {
  useNavigate,
  useParams,
} from "react-router-dom";

import PermissionForm from "../../components/permissions/PermissionForm";

import {
  usePermission,
  useUpdatePermission,
} from "../../hooks/usePermissions";

import type {
  PermissionFormData,
} from "../../types";

function EditPermission() {
  const navigate = useNavigate();

  const { id } = useParams();

  const permissionId = Number(id);

  const {
    data: permission,
    isLoading,
    isError,
  } = usePermission(
    permissionId,
  );

  const updateMutation =
    useUpdatePermission();

  if (isLoading) {
    return (
      <PageState title="Loading permission..." />
    );
  }

  if (isError || !permission) {
    return (
      <PageState
        title="Permission not found"
        actionLabel="Back to Permissions"
        onAction={() =>
          navigate("/permissions")
        }
      />
    );
  }

  const handleSubmit = (
    data: PermissionFormData,
  ) => {
    updateMutation.mutate(
      {
        id: permission.id,
        data,
      },
      {
        onSuccess: () => {
          navigate(
            "/permissions",
          );
        },
      },
    );
  };

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      <div className="mb-6">
        <h1 className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-[28px] font-extrabold text-transparent">
          Edit Permission
        </h1>

        <p className="mt-1 text-sm text-[#667085]">
          Update permission configuration
        </p>
      </div>

      <PermissionForm
        initialData={permission}
        submitLabel="Update Permission"
        isSubmitting={
          updateMutation.isPending
        }
        onSubmit={handleSubmit}
        onCancel={() =>
          navigate(
            `/permissions`,
          )
        }
      />
    </div>
  );
}

function PageState({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {  
  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="font-extrabold text-slate-800">
          {title}
        </p>

        {actionLabel && onAction && (
  <button
    type="button"
    onClick={onAction}
    className="mt-4 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white"
  >
    {actionLabel}
  </button>
)}
      </div>
    </div>
  );
}

export default EditPermission;
