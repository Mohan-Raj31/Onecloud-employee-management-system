import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useCreateUser,
} from "../../hooks/useUsers";

import type {
  UserRole,
  UserStatus,
} from "../../types";

interface UserForm {
  firstName: string;
  lastName: string;
  employeeId: string;
  email: string;
  mobile: string;

  organization: string;
  businessUnit: string;
  department: string;
  branch: string;

  username: string;
  role: UserRole;
  reportingManager: string;

  status: UserStatus;
  emailVerified: boolean;
  mobileVerified: boolean;
}

const initialForm: UserForm = {
  firstName: "",
  lastName: "",
  employeeId: "",
  email: "",
  mobile: "",

  organization: "ABC Technologies",
  businessUnit: "Technology",
  department: "Information Technology",
  branch: "Hyderabad",

  username: "",
  role: "Employee",
  reportingManager: "",

  status: "Active",
  emailVerified: false,
  mobileVerified: false,
};

function CreateUser() {
  const navigate = useNavigate();

  const createUser =
    useCreateUser();

  const [form, setForm] =
    useState<UserForm>(initialForm);

  const [error, setError] =
    useState("");

  const handleChange = (
    field: keyof UserForm,
    value: string | boolean,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const handleSave = async () => {
    if (!form.firstName.trim()) {
      setError(
        "First Name is required.",
      );
      return;
    }

    if (!form.lastName.trim()) {
      setError(
        "Last Name is required.",
      );
      return;
    }

    if (!form.email.trim()) {
      setError(
        "Email Address is required.",
      );
      return;
    }

    if (!form.username.trim()) {
      setError(
        "Username is required.",
      );
      return;
    }

    try {
      await createUser.mutateAsync({
        ...form,

        firstName:
          form.firstName.trim(),

        lastName:
          form.lastName.trim(),

        employeeId:
          form.employeeId.trim(),

        email:
          form.email.trim(),

        mobile:
          form.mobile.trim(),

        username:
          form.username.trim(),

        reportingManager:
          form.reportingManager.trim(),
      });

      navigate("/users");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create user.",
      );
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1000px] space-y-6">

      <section>
        <h1 className="bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-[30px] font-extrabold tracking-[-1px] text-transparent max-[650px]:text-[23px] max-[400px]:text-[20px]">
          Create User
        </h1>

        <p className="mt-1 text-sm font-medium text-[#667085]">
          Create a new platform user
        </p>
      </section>

      <section className="space-y-6 rounded-[17px] border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.05)] max-[600px]:p-4">

        <FormSection title="User Information">
          <FormInput
            label="First Name"
            required
            value={form.firstName}
            onChange={(value) =>
              handleChange(
                "firstName",
                value,
              )
            }
          />

          <FormInput
            label="Last Name"
            required
            value={form.lastName}
            onChange={(value) =>
              handleChange(
                "lastName",
                value,
              )
            }
          />

          <FormInput
            label="Employee ID"
            value={form.employeeId}
            onChange={(value) =>
              handleChange(
                "employeeId",
                value,
              )
            }
          />

          <FormInput
            label="Email Address"
            required
            type="email"
            value={form.email}
            onChange={(value) =>
              handleChange(
                "email",
                value,
              )
            }
          />

          <FormInput
            label="Mobile Number"
            value={form.mobile}
            onChange={(value) =>
              handleChange(
                "mobile",
                value,
              )
            }
            full
          />
        </FormSection>

        <FormSection title="Organization Details">
          <FormInput
            label="Organization"
            value={form.organization}
            onChange={(value) =>
              handleChange(
                "organization",
                value,
              )
            }
          />

          <FormInput
            label="Business Unit"
            value={form.businessUnit}
            onChange={(value) =>
              handleChange(
                "businessUnit",
                value,
              )
            }
          />

          <FormInput
            label="Department"
            value={form.department}
            onChange={(value) =>
              handleChange(
                "department",
                value,
              )
            }
          />

          <FormInput
            label="Branch"
            value={form.branch}
            onChange={(value) =>
              handleChange(
                "branch",
                value,
              )
            }
          />
        </FormSection>

        <FormSection title="Access Information">
          <FormInput
            label="Username"
            required
            value={form.username}
            onChange={(value) =>
              handleChange(
                "username",
                value,
              )
            }
          />

          <FormSelect
            label="Role"
            value={form.role}
            options={[
              "System Admin",
              "HR Manager",
              "Manager",
              "Employee",
            ]}
            onChange={(value) =>
              handleChange(
                "role",
                value,
              )
            }
          />

          <FormInput
            label="Reporting Manager"
            value={
              form.reportingManager
            }
            onChange={(value) =>
              handleChange(
                "reportingManager",
                value,
              )
            }
            full
          />
        </FormSection>

        <FormSection title="Account Status">
          <div className="md:col-span-2">
            <p className="mb-3 text-sm font-bold text-slate-700">
              Status
            </p>

            <div className="flex flex-wrap gap-5">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <input
                  type="radio"
                  checked={
                    form.status ===
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

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                <input
                  type="radio"
                  checked={
                    form.status ===
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
            </div>
          </div>

          <CheckboxField
            label="Email Verification"
            checked={
              form.emailVerified
            }
            onChange={(value) =>
              handleChange(
                "emailVerified",
                value,
              )
            }
          />

          <CheckboxField
            label="Mobile Verification"
            checked={
              form.mobileVerified
            }
            onChange={(value) =>
              handleChange(
                "mobileVerified",
                value,
              )
            }
          />
        </FormSection>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 max-[500px]:flex-col">

          <button
            type="button"
            onClick={() =>
              navigate("/users")
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setError("");
            }}
            className="h-11 rounded-xl border border-indigo-200 bg-indigo-50 px-5 text-sm font-bold text-indigo-600"
          >
            Reset
          </button>

          <button
            type="button"
            disabled={
              createUser.isPending
            }
            onClick={() =>
              void handleSave()
            }
            className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-bold text-white disabled:opacity-60 max-[500px]:w-full"
          >
            {createUser.isPending
              ? "Saving..."
              : "Save User"}
          </button>

        </div>
      </section>
    </div>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-extrabold text-red-900 max-[500px]:text-lg">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-5 max-[650px]:grid-cols-1">
        {children}
      </div>
    </section>
  );
}

function FormInput({
  label,
  required = false,
  value,
  onChange,
  type = "text",
  full = false,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  full?: boolean;
}) {
  return (
    <div
      className={
        full ? "md:col-span-2" : ""
      }
    >
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}

function FormSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      >
        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ),
        )}
      </select>
    </div>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm font-semibold text-slate-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(
            event.target.checked,
          )
        }
        className="h-4 w-4 accent-indigo-600"
      />

      {label}
    </label>
  );
}

export default CreateUser;
