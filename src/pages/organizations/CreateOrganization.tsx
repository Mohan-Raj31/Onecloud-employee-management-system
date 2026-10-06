import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCreateOrganization } from "../../hooks/useOrganizations";

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

const initialForm: OrganizationForm = {
  name: "",
  code: "",
  businessType: "IT Services",
  location: "Hyderabad",
  status: "Active",
};

function CreateOrganization() {
  const navigate = useNavigate();

  const createOrganization =
    useCreateOrganization();

  const [form, setForm] =
    useState<OrganizationForm>(initialForm);

  const [error, setError] = useState("");

  const handleChange = (
    field: keyof OrganizationForm,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleSave = async () => {
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
      await createOrganization.mutateAsync({
        name: form.name.trim(),
        code: form.code.trim(),
        businessType: form.businessType,
        location: form.location.trim(),
        status: form.status,
      });

      // After successful save
      // go back to Organizations page.
      navigate("/organizations");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create organization.",
      );
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setError("");
  };

  const handleCancel = () => {
    navigate("/organizations");
  };

  return (
    <div className="mx-auto w-full max-w-[1000px] space-y-6">

      {/* HEADER */}
      <section>
        <h1 className="bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-[30px] font-extrabold tracking-[-1px] text-transparent max-[650px]:text-[23px] max-[400px]:text-[20px]">
          Create Organization
        </h1>

        <p className="mt-1 text-sm font-medium text-[#667085] max-[400px]:text-xs">
          Create a new organization
        </p>
      </section>

      {/* FORM */}
      <section className="rounded-[17px] border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.05)] max-[600px]:p-4">

        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-red-900 max-[500px]:text-lg">
            Organization Information
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-500">
            Enter the organization details
          </p>
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
              createOrganization.isPending
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50 max-[500px]:flex-1"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={
              createOrganization.isPending
            }
            className="h-11 rounded-xl border border-indigo-200 bg-indigo-50 px-5 text-sm font-bold text-indigo-600 transition hover:bg-indigo-100 max-[500px]:flex-1"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={
              createOrganization.isPending
            }
            className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 max-[500px]:w-full"
          >
            {createOrganization.isPending
              ? "Saving..."
              : "Save"}
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
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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

export default CreateOrganization;