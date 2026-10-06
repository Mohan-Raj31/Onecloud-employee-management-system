import { useEffect, useState } from "react";
import type { PlatformConfiguration as PlatformConfigurationType } from "../types";

import {
  usePlatformConfiguration,
  useUpdatePlatformConfiguration,
} from "../hooks/usePlatformConfiguration";

function PlatformConfiguration() {
  const { data, isLoading, isError } = usePlatformConfiguration();

  const updateConfiguration = useUpdatePlatformConfiguration();

  const [configuration, setConfiguration] =
    useState<PlatformConfigurationType | null>(null);

  useEffect(() => {
    if (data) {
      setConfiguration(data);
    }
  }, [data]);

  const handleChange = (
    field: keyof PlatformConfigurationType,
    value: string | boolean,
  ) => {
    setConfiguration((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        [field]: value,
      };
    });

    if (updateConfiguration.isSuccess) {
      updateConfiguration.reset();
    }
  };

  const handleReset = () => {
    if (data) {
      setConfiguration(data);
    }

    updateConfiguration.reset();
  };

  const handleSave = () => {
    if (!configuration) {
      return;
    }

    updateConfiguration.mutate(configuration);
  };

  if (isLoading || !configuration) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading platform configuration...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Failed to load platform configuration.
      </div>
    );
  }

  return (
    <div className="space-y-6">
     
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[31px] font-extrabold tracking-[-1px] max-[650px]:text-[25px] bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-transparent">
            Platform Configuration
          </h1>

          <p className="mt-1 text-sm font-medium text-[#667085]">
            Manage platform-wide configuration
          </p>
        </div>

      </div>


      {updateConfiguration.isSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>

          Platform configuration has been saved successfully.
        </div>
      )}

      
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="8.5" />
              <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5S9.7 5.9 12 3.5z" />
            </svg>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              General Configuration
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure basic platform information.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            label="Platform Name"
            value={configuration.platformName}
            onChange={(value) =>
              handleChange("platformName", value)
            }
          />

          <FormField
            label="Platform URL"
            value={configuration.platformUrl}
            onChange={(value) =>
              handleChange("platformUrl", value)
            }
          />

          <FormField
            label="Support Email"
            type="email"
            value={configuration.supportEmail}
            onChange={(value) =>
              handleChange("supportEmail", value)
            }
          />

          <SelectField
            label="Default Timezone"
            value={configuration.timezone}
            options={[
              "Asia/Kolkata",
              "UTC",
              "America/New_York",
              "Europe/London",
              "Asia/Singapore",
            ]}
            onChange={(value) =>
              handleChange("timezone", value)
            }
          />
        </div>
      </section>

    
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
            </svg>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Authentication Configuration
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage authentication and login security settings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            label="Session Timeout (minutes)"
            type="number"
            value={configuration.sessionTimeout}
            onChange={(value) =>
              handleChange("sessionTimeout", value)
            }
          />

          <SelectField
            label="Password Policy"
            value={configuration.passwordPolicy}
            options={[
              "Basic",
              "Medium",
              "Strong",
              "Very Strong",
            ]}
            onChange={(value) =>
              handleChange("passwordPolicy", value)
            }
          />

          <ToggleField
            label="Login Security"
            description="Enable additional security checks during login."
            checked={configuration.loginSecurity}
            onChange={(value) =>
              handleChange("loginSecurity", value)
            }
          />
        </div>
      </section>

      
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <rect x="3.5" y="5" width="17" height="14" rx="2" />
              <path d="M4 7l8 6 8-6" />
            </svg>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Email Configuration
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure platform email and notification settings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            label="SMTP Host"
            value={configuration.smtpHost}
            onChange={(value) =>
              handleChange("smtpHost", value)
            }
          />

          <FormField
            label="SMTP Port"
            type="number"
            value={configuration.smtpPort}
            onChange={(value) =>
              handleChange("smtpPort", value)
            }
          />

          <FormField
            label="Sender Email"
            type="email"
            value={configuration.senderEmail}
            onChange={(value) =>
              handleChange("senderEmail", value)
            }
          />

          <ToggleField
            label="Email Notifications"
            description="Enable system-generated email notifications."
            checked={configuration.emailNotifications}
            onChange={(value) =>
              handleChange("emailNotifications", value)
            }
          />
        </div>
      </section>

      
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <path d="M8 8h8M8 12h8M8 16h5" />
            </svg>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              System Configuration
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage system-wide operational settings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ToggleField
            label="Maintenance Mode"
            description="Temporarily restrict access while maintenance is performed."
            checked={configuration.maintenanceMode}
            onChange={(value) =>
              handleChange("maintenanceMode", value)
            }
          />

          <FormField
            label="File Upload Limit (MB)"
            type="number"
            value={configuration.fileUploadLimit}
            onChange={(value) =>
              handleChange("fileUploadLimit", value)
            }
          />

          <ToggleField
            label="System Notifications"
            description="Display important system notifications to users."
            checked={configuration.systemNotifications}
            onChange={(value) =>
              handleChange("systemNotifications", value)
            }
          />
        </div>
      </section>

     
      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleReset}
          disabled={updateConfiguration.isPending}
          className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={updateConfiguration.isPending}
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {updateConfiguration.isPending
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
};

function FormField({
  label,
  value,
  type = "text",
  onChange,
}: FormFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function SelectField({
  label,
  value,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

type ToggleFieldProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function ToggleField({
  label,
  description,
  checked,
  onChange,
}: ToggleFieldProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div>
        <p className="text-sm font-semibold text-slate-800">
          {label}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
          checked ? "bg-indigo-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default PlatformConfiguration;