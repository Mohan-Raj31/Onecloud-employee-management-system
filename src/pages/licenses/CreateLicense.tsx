import {
  FormEvent,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import {
  licenseOrganizationOptions,
  licenseTypeOptions,
  renewalPeriodOptions,
} from "../../data/licenses";

import { useCreateLicense } from "../../hooks/useLicenses";

function CreateLicense() {
  const navigate = useNavigate();

  const createLicense =
    useCreateLicense();

  const [organization, setOrganization] =
    useState("");

  const [licenseType, setLicenseType] =
    useState("");

  const [activationDate, setActivationDate] =
    useState("");

  const [expiryDate, setExpiryDate] =
    useState("");

  const [renewalPeriod, setRenewalPeriod] =
    useState("12 Months");

  const [error, setError] =
    useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (!organization) {
      setError(
        "Organization is required.",
      );
      return;
    }

    if (!licenseType) {
      setError(
        "License type is required.",
      );
      return;
    }

    if (!activationDate) {
      setError(
        "Activation date is required.",
      );
      return;
    }

    if (!expiryDate) {
      setError(
        "Expiry date is required.",
      );
      return;
    }

    if (
      new Date(expiryDate) <=
      new Date(activationDate)
    ) {
      setError(
        "Expiry date must be greater than the activation date.",
      );
      return;
    }

    createLicense.mutate(
      {
        organization,
        licenseType,
        activationDate,
        expiryDate,
        renewalPeriod,
      },
      {
        onSuccess: () => {
          navigate(
            "/license-management",
          );
        },
        onError: (mutationError) => {
          setError(
            mutationError.message,
          );
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[31px] font-extrabold tracking-[-1px] max-[650px]:text-[25px] bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-transparent">
          Create License
        </h1>

        <p className="mt-1 text-sm font-medium text-[#667085]">
          Create a new platform license
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2 md:p-6">
          <FormField
            label="Organization"
            required
          >
            <select
              value={organization}
              onChange={(event) =>
                setOrganization(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">
                Select Organization
              </option>

              {licenseOrganizationOptions
                .filter(
                  (option) =>
                    option !==
                    "All Organizations",
                )
                .map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
            </select>
          </FormField>

          <FormField
            label="License Type"
            required
          >
            <select
              value={licenseType}
              onChange={(event) =>
                setLicenseType(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">
                Select License Type
              </option>

              {licenseTypeOptions
                .filter(
                  (option) =>
                    option !==
                    "All License Types",
                )
                .map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
            </select>
          </FormField>

          <FormField
            label="Activation Date"
            required
          >
            <input
              type="date"
              value={activationDate}
              onChange={(event) =>
                setActivationDate(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </FormField>

          <FormField
            label="Expiry Date"
            required
          >
            <input
              type="date"
              value={expiryDate}
              min={activationDate || undefined}
              onChange={(event) =>
                setExpiryDate(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </FormField>

          <FormField
            label="Renewal Period"
            required
          >
            <select
              value={renewalPeriod}
              onChange={(event) =>
                setRenewalPeriod(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            >
              {renewalPeriodOptions.map(
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
          </FormField>
        </div>

        {error && (
          <div className="mx-5 mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 md:mx-6">
            {error}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-5 sm:flex-row sm:justify-end md:p-6">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/license-management",
              )
            }
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={
              createLicense.isPending
            }
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createLicense.isPending
              ? "Creating..."
              : "Create License"}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

export default CreateLicense;
