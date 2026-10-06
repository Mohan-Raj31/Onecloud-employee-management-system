import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useUpdateUser,
  useUser,
} from "../../hooks/useUsers";

import type { User, UserRole} from "../../types";

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const userId = Number(id);

  const {
    data: user,
    isLoading,
    isError,
  } = useUser(userId);

  const updateUser = useUpdateUser();

  const [formData, setFormData] =
    useState<Omit<User, "id" | "createdAt"> | null>(
      null,
    );

  useEffect(() => {
    if (!user) return;

    const {
      id: _id,
      createdAt: _createdAt,
      ...editableData
    } = user;

    setFormData(editableData);
  }, [user]);

  const handleChange = <
    K extends keyof Omit<User, "id" | "createdAt">
  >(
    field: K,
    value: Omit<User, "id" | "createdAt">[K],
  ) => {
    setFormData((previous) =>
      previous
        ? {
            ...previous,
            [field]: value,
          }
        : previous,
    );
  };

  const handleUpdate = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!formData) return;

    try {
      await updateUser.mutateAsync({
        id: userId,
        data: formData,
      });

      navigate("/users");
    } catch (error) {
      console.error(
        "Failed to update user:",
        error,
      );
    }
  };

  if (isLoading) {
    return <PageState title="Loading user..." />;
  }

  if (isError || !user || !formData) {
    return (
      <PageState
        title="User not found"
        actionLabel="Back to Users"
        onAction={() => navigate("/users")}
      />
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1100px]">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-[28px] font-extrabold tracking-[-0.7px] text-transparent max-[650px]:text-[23px]">
          Edit User
        </h1>

        <p className="mt-1 text-sm text-[#667085]">
          Update user information and account details
        </p>
      </div>

      <form
        onSubmit={handleUpdate}
        className="space-y-6"
      >
        {/* USER INFORMATION */}
        <EditSection title="USER INFORMATION">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(value) =>
              handleChange("firstName", value)
            }
            required
          />

          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(value) =>
              handleChange("lastName", value)
            }
            required
          />

          <Input
            label="Employee ID"
            value={formData.employeeId}
            onChange={(value) =>
              handleChange("employeeId", value)
            }
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(value) =>
              handleChange("email", value)
            }
            required
          />

          <div className="col-span-2 max-[650px]:col-span-1">
            <Input
              label="Mobile Number"
              value={formData.mobile || ""}
              onChange={(value) =>
                handleChange("mobile", value)
              }
            />
          </div>
        </EditSection>

        {/* ORGANIZATION DETAILS */}
        <EditSection title="ORGANIZATION DETAILS">
          <Input
            label="Organization"
            value={formData.organization}
            onChange={(value) =>
              handleChange("organization", value)
            }
            required
          />

          <Input
            label="Business Unit"
            value={formData.businessUnit || ""}
            onChange={(value) =>
              handleChange("businessUnit", value)
            }
          />

          <Input
            label="Department"
            value={formData.department || ""}
            onChange={(value) =>
              handleChange("department", value)
            }
          />

          <Input
            label="Branch"
            value={formData.branch || ""}
            onChange={(value) =>
              handleChange("branch", value)
            }
          />
        </EditSection>

        {/* ACCESS INFORMATION */}
        <EditSection title="ACCESS INFORMATION">
          <Input
            label="Username"
            value={formData.username}
            onChange={(value) =>
              handleChange("username", value)
            }
            required
          />

          <Input
  label="Role"
  value={formData.role}
  onChange={(value) =>
    handleChange("role", value as UserRole)
  }
  required
/>

          <div className="col-span-2 max-[650px]:col-span-1">
            <Input
              label="Reporting Manager"
              value={
                formData.reportingManager || ""
              }
              onChange={(value) =>
                handleChange(
                  "reportingManager",
                  value,
                )
              }
            />
          </div>
        </EditSection>

        {/* ACCOUNT STATUS */}
        <EditSection title="ACCOUNT STATUS">
          <div className="col-span-2 max-[650px]:col-span-1">
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Status
            </p>

            <div className="flex gap-6 max-[400px]:flex-col max-[400px]:gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="status"
                  checked={
                    formData.status ===
                    "Active"
                  }
                  onChange={() =>
                    handleChange(
                      "status",
                      "Active",
                    )
                  }
                />

                Active
              </label>

              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="status"
                  checked={
                    formData.status ===
                    "Inactive"
                  }
                  onChange={() =>
                    handleChange(
                      "status",
                      "Inactive",
                    )
                  }
                />

                Inactive
              </label>

              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name="status"
                  checked={
                    formData.status ===
                    "Pending"
                  }
                  onChange={() =>
                    handleChange(
                      "status",
                      "Pending",
                    )
                  }
                />

                Pending
              </label>
            </div>
          </div>

          <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={
                formData.emailVerified ||
                false
              }
              onChange={(event) =>
                handleChange(
                  "emailVerified",
                  event.target.checked,
                )
              }
            />

            Email Verification — Verified
          </label>

          <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={
                formData.mobileVerified ||
                false
              }
              onChange={(event) =>
                handleChange(
                  "mobileVerified",
                  event.target.checked,
                )
              }
            />

            Mobile Verification — Verified
          </label>
        </EditSection>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pb-6 max-[500px]:flex-col">
          <button
            type="button"
            onClick={() => navigate("/users")}
            disabled={updateUser.isPending}
            className="rounded-xl border border-[#cbd5e1] bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={updateUser.isPending}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3 text-sm font-bold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updateUser.isPending
              ? "Updating..."
              : "Update User"}
          </button>
        </div>
      </form>
    </section>
  );
}

function EditSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#dce4f2] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.06)] max-[650px]:p-4">
      <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-5 max-[650px]:grid-cols-1">
        {children}
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-[#d6deea] bg-[#fbfcff] px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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

export default EditUser;
