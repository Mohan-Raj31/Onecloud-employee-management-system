import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useOrganization,
  useUpdateOrganization,
} from "../../hooks/useOrganizations";

import type {
  BusinessType,
  OrganizationStatus,
} from "../../types";

interface OrganizationForm {
  name: string;
  code: string;
  businessType: BusinessType;
  location: string;
  status: OrganizationStatus;
}

function EditOrganization() {
  const navigate = useNavigate();
  const { id } = useParams();

  const organizationId = Number(id);

  const {
    data: organization,
    isLoading,
    isError,
  } = useOrganization(organizationId);

  const updateOrganization =
    useUpdateOrganization();

  const [form, setForm] =
    useState<OrganizationForm | null>(null);

  const [error, setError] = useState("");

  /*
    Load the selected organization
    into the form.
  */
  useEffect(() => {
    if (organization) {
      setForm({
        name: organization.name,
        code: organization.code,
        businessType:
          organization.businessType,
        location: organization.location,
        status: organization.status,
      });
    }
  }, [organization]);

  const handleChange = (
    field: keyof OrganizationForm,
    value: string,
  ) => {
    setForm((previous) =>
      previous
        ? {
            ...previous,
            [field]: value,
          }
        : previous,
    );

    setError("");
  };

  const handleSave = async () => {
    if (!form) return;

    if (!form.name.trim()) {
      setError("Company Name is required.");
      return;
    }

    if (!form.code.trim()) {
      setError("Code is required.");
      return;
    }

    if (!form.location.trim()) {
      setError("Location is required.");
      return;
    }

    try {
      await updateOrganization.mutateAsync({
        id: organizationId,

        data: {
          name: form.name.trim(),
          code: form.code.trim(),
          businessType:
            form.businessType,
          location: form.location.trim(),
          status: form.status,
        },
      });

      // After successful update
      // go directly to Organizations page.
      navigate("/organizations");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update organization.",
      );
    }
  };

  const handleCancel = () => {
    navigate("/organizations");
  };

  if (isLoading) {
    return (
      <PageState title="Loading organization..." />
    );
  }

  if (
    isError ||
    !organization ||
    !form
  ) {
    return (
      <PageState
        title="Organization not found"
        action={() =>
          navigate("/organizations")
        }
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] space-y-6">

      {/* HEADER */}
      <section>
        <h1 className="bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-[30px] font-extrabold tracking-[-1px] text-transparent max-[650px]:text-[23px] max-[400px]:text-[20px]">
          Edit Organization
        </h1>

        <p className="mt-1 text-sm font-medium text-[#667085] max-[400px]:text-xs">
          Update organization details
        </p>
      </section>

      {/* FORM */}
      <section className="rounded-[17px] border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.05)] max-[600px]:p-4">

        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-red-900 max-[500px]:text-lg">
            Organization Information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <FormField
            label="Company Name"
            required
            value={form.name}
            onChange={(value) =>
              handleChange("name", value)
            }
          />

          <FormField
            label="Code"
            required
            value={form.code}
            onChange={(value) =>
              handleChange(
                "code",
                value.toUpperCase(),
              )
            }
          />

          <SelectField
            label="Business Type"
            required
            value={form.businessType}
            options={[
              "IT Services",
              "Manufacturing",
              "Consulting",
            ]}
            onChange={(value) =>
              handleChange(
                "businessType",
                value,
              )
            }
          />

          <FormField
            label="Location"
            required
            value={form.location}
            onChange={(value) =>
              handleChange(
                "location",
                value,
              )
            }
          />

          <SelectField
            label="Status"
            required
            value={form.status}
            options={[
              "Active",
              "Inactive",
            ]}
            onChange={(value) =>
              handleChange(
                "status",
                value,
              )
            }
          />

        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        {/* ACTIONS */}
        <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">

          <button
            type="button"
            onClick={handleCancel}
            disabled={
              updateOrganization.isPending
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 max-[500px]:flex-1"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() =>
              void handleSave()
            }
            disabled={
              updateOrganization.isPending
            }
            className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 max-[500px]:w-full"
          >
            {updateOrganization.isPending
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  required = false,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}

function SelectField({
  label,
  required = false,
  value,
  options,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function PageState({
  title,
  action,
}: {
  title: string;
  action?: () => void;
}) {
  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="font-extrabold text-slate-800">
          {title}
        </p>

        {action && (
          <button
            type="button"
            onClick={action}
            className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white"
          >
            Back to Organizations
          </button>
        )}
      </div>
    </div>
  );
}

export default EditOrganization;