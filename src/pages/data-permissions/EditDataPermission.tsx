import {
  useNavigate,
  useParams,
} from "react-router-dom";

import DataPermissionForm from "../../components/data-permissions/DataPermissionForm";

import {
  useDataPermission,
  useUpdateDataPermission,
} from "../../hooks/useDataPermissions";

import type {
  DataPermissionFormData,
} from "../../types";

function EditDataPermission() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const policyId =
    Number(id);

  const {
    data: policy,
    isLoading,
    isError,
  } = useDataPermission(
    policyId,
  );

  const mutation =
    useUpdateDataPermission();

  if (isLoading) {
    return (
      <PageState
        title="Loading data permission..."
      />
    );
  }

  if (
    isError ||
    !policy
  ) {
    return (
      <PageState
        title="Data permission not found"
        actionLabel="Back to Data Permissions"
        onAction={() =>
          navigate(
            "/data-permissions",
          )
        }
      />
    );
  }

  const handleSubmit = (
    data: DataPermissionFormData,
  ) => {
    mutation.mutate(
      {
        id: policy.id,
        data,
      },
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
          Edit Data Permission
        </h1>

        <p className="mt-1 text-sm text-[#667085]">
          Update data access
          policy configuration
        </p>
      </div>

      <DataPermissionForm
        initialData={policy}
        submitLabel="Update Policy"
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

        {actionLabel &&
          onAction && (
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

export default EditDataPermission;
