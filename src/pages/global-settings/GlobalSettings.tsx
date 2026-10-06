import {
  useEffect,
  useState,
} from "react";

import {
  globalCurrencies,
  globalDateFormats,
  globalLanguages,
  globalNumberFormats,
  globalSettingCategories,
  globalSettingStatuses,
  globalTimeFormats,
  globalTimeZones,
} from "../../data/globalSettings";

import type { GlobalSettings } from "../../types";

import {
  useGlobalSettings,
  useResetGlobalSettings,
  useUpdateGlobalSettings,
} from "../../hooks/useGlobalSettings";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

const labelClass =
  "text-xs font-medium text-slate-600";

function SettingsIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.72 1.72-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2.44v-.18a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06L8 16.94l.06-.06A1.7 1.7 0 0 0 8.4 15a1.7 1.7 0 0 0-1.56-1.03H6v-2.44h.84A1.7 1.7 0 0 0 8.4 10a1.7 1.7 0 0 0-.34-1.88L8 8.06l1.72-1.72.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 12.69 5V4h2.44v1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.72 1.72-.06.06A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.56 1.03H22v2.44h-1.04A1.7 1.7 0 0 0 19.4 15Z" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M20 11a8.1 8.1 0 0 0-14.9-3L3 11" />
      <path d="M3 5v6h6" />
      <path d="M4 13a8.1 8.1 0 0 0 14.9 3L21 13" />
      <path d="M21 19v-6h-6" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 4h11l3 3v13H5V4Z" />
      <path d="M8 4v6h8V4" />
      <path d="M8 20v-6h8v6" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M4 12a8 8 0 1 0 2.34-5.66" />
      <path d="M4 5v5h5" />
    </svg>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="text-sm font-semibold text-slate-800">
        {title}
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default function GlobalSettings() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGlobalSettings();

  const updateMutation =
    useUpdateGlobalSettings();

  const resetMutation =
    useResetGlobalSettings();

  const [form, setForm] =
  useState<GlobalSettings | null>(null);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (data) {
      setForm(data);
    }
  }, [data]);

  function updateField<
    K extends keyof GlobalSettings,
  >(
    field: K,
    value: GlobalSettings[K],
  ) {
    setForm((current) =>
      current
        ? {
            ...current,
            [field]: value,
          }
        : current,
    );

    setMessage("");
    setError("");
  }

  async function handleSave() {
    if (!form) return;

    setMessage("");
    setError("");

    try {
      await updateMutation.mutateAsync(form);

      setMessage(
        "Global Settings saved successfully.",
      );
    } catch (mutationError) {
      setError(
        mutationError instanceof Error
          ? mutationError.message
          : "Unable to save Global Settings.",
      );
    }
  }

  async function handleReset() {
    setMessage("");
    setError("");

    const confirmed = window.confirm(
      "Are you sure you want to restore the default Global Settings?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const defaults =
        await resetMutation.mutateAsync();

      setForm(defaults);

      setMessage(
        "Default settings restored successfully.",
      );
    } catch {
      setError(
        "Unable to restore default settings.",
      );
    }
  }

  async function handleRefresh() {
    setMessage("");
    setError("");

    try {
      await refetch();
      setMessage(
        "Global Settings refreshed successfully.",
      );
    } catch {
      setError(
        "Unable to refresh Global Settings.",
      );
    }
  }

  if (isLoading || !form) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading Global Settings...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 p-5">
        <p className="text-sm text-red-600">
          Unable to load Global Settings.
        </p>

        <button
          type="button"
          onClick={handleRefresh}
          className="mt-3 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-6">
      {/* Page Header */}
      <div className="rounded-xl  bg-gradient-to-r from-indigo-600 via-blue-800 to-cyan-700 px-4 py-4 shadow-sm sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <SettingsIcon />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-white sm:text-2xl">
              Global Settings
            </h1>

            <p className="mt-0.5 text-xs text-white sm:text-sm">
              Configure and manage platform-wide
              operational settings.
            </p>
          </div>
        </div>
      </div>

      {/* Success / Error Messages */}
      {message && (
        <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* General Settings */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <SectionHeader
          title="General Settings"
          description="Manage the basic global setting information."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>
              Setting ID
            </span>

            <input
              value={form.settingId}
              disabled
              className={`${inputClass} cursor-not-allowed bg-slate-50 text-slate-400`}
            />
          </label>

          <label>
            <span className={labelClass}>
              Setting Name
            </span>

            <input
              value={form.settingName}
              onChange={(event) =>
                updateField(
                  "settingName",
                  event.target.value,
                )
              }
              className={inputClass}
            />
          </label>

          <label>
            <span className={labelClass}>
              Category
            </span>

            <select
              value={form.category}
              onChange={(event) =>
                updateField(
                  "category",
                  event.target.value,
                )
              }
              className={inputClass}
            >
              {globalSettingCategories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Status
            </span>

            <select
              value={form.status}
              onChange={(event) =>
                updateField(
                  "status",
                  event.target.value as
                    | "Active"
                    | "Inactive",
                )
              }
              className={inputClass}
            >
              {globalSettingStatuses.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ),
              )}
            </select>
          </label>

          <label className="md:col-span-2">
            <span className={labelClass}>
              Description
            </span>

            <textarea
              value={form.description}
              maxLength={1000}
              rows={4}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value,
                )
              }
              className={inputClass}
            />

            <span className="mt-1 block text-right text-[11px] text-slate-400">
              {form.description.length}/1000
            </span>
          </label>
        </div>
      </section>

      {/* Application Defaults */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <SectionHeader
          title="Application Defaults"
          description="Configure default localization and application preferences."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label>
            <span className={labelClass}>
              Default Language
            </span>

            <select
              value={form.defaultLanguage}
              onChange={(event) =>
                updateField(
                  "defaultLanguage",
                  event.target.value,
                )
              }
              className={inputClass}
            >
              {globalLanguages.map(
                (language) => (
                  <option
                    key={language}
                    value={language}
                  >
                    {language}
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Default Time Zone
            </span>

            <select
              value={form.defaultTimeZone}
              onChange={(event) =>
                updateField(
                  "defaultTimeZone",
                  event.target.value,
                )
              }
              className={inputClass}
            >
              {globalTimeZones.map(
                (timeZone) => (
                  <option
                    key={timeZone}
                    value={timeZone}
                  >
                    {timeZone}
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Default Currency
            </span>

            <select
              value={form.defaultCurrency}
              onChange={(event) =>
                updateField(
                  "defaultCurrency",
                  event.target.value,
                )
              }
              className={inputClass}
            >
              {globalCurrencies.map(
                (currency) => (
                  <option
                    key={currency}
                    value={currency}
                  >
                    {currency}
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Date Format
            </span>

            <select
              value={form.dateFormat}
              onChange={(event) =>
                updateField(
                  "dateFormat",
                  event.target.value,
                )
              }
              className={inputClass}
            >
              {globalDateFormats.map(
                (format) => (
                  <option
                    key={format}
                    value={format}
                  >
                    {format}
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Time Format
            </span>

            <select
              value={form.timeFormat}
              onChange={(event) =>
                updateField(
                  "timeFormat",
                  event.target.value,
                )
              }
              className={inputClass}
            >
              {globalTimeFormats.map(
                (format) => (
                  <option
                    key={format}
                    value={format}
                  >
                    {format}
                  </option>
                ),
              )}
            </select>
          </label>

          <label>
            <span className={labelClass}>
              Number Format
            </span>

            <select
              value={form.numberFormat}
              onChange={(event) =>
                updateField(
                  "numberFormat",
                  event.target.value,
                )
              }
              className={inputClass}
            >
              {globalNumberFormats.map(
                (format) => (
                  <option
                    key={format}
                    value={format}
                  >
                    {format}
                  </option>
                ),
              )}
            </select>
          </label>
        </div>
      </section>

      {/* Operational Settings */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <SectionHeader
          title="Operational Settings"
          description="Configure session, security and system behaviour."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label>
            <span className={labelClass}>
              Session Timeout
            </span>

            <input
              type="number"
              min={1}
              value={form.sessionTimeout}
              onChange={(event) =>
                updateField(
                  "sessionTimeout",
                  Number(event.target.value),
                )
              }
              className={inputClass}
            />

            <span className="mt-1 block text-[11px] text-slate-400">
              Minutes
            </span>
          </label>

          <label>
            <span className={labelClass}>
              Password Expiry
            </span>

            <input
              type="number"
              min={1}
              value={form.passwordExpiry}
              onChange={(event) =>
                updateField(
                  "passwordExpiry",
                  Number(event.target.value),
                )
              }
              className={inputClass}
            />

            <span className="mt-1 block text-[11px] text-slate-400">
              Days
            </span>
          </label>

          <label>
            <span className={labelClass}>
              Maximum Login Attempts
            </span>

            <input
              type="number"
              min={1}
              value={form.maximumLoginAttempts}
              onChange={(event) =>
                updateField(
                  "maximumLoginAttempts",
                  Number(event.target.value),
                )
              }
              className={inputClass}
            />
          </label>

          {[
            {
              key: "autoLogout",
              label: "Auto Logout",
              value: form.autoLogout,
            },
            {
              key: "maintenanceNotification",
              label: "Maintenance Notification",
              value:
                form.maintenanceNotification,
            },
            {
              key: "systemAnnouncement",
              label: "System Announcement",
              value:
                form.systemAnnouncement,
            },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <span className="text-sm font-medium text-slate-700">
                {item.label}
              </span>

              <button
                type="button"
                role="switch"
                aria-checked={item.value}
                onClick={() => {
                  updateField(
                    item.key as
                      | "autoLogout"
                      | "maintenanceNotification"
                      | "systemAnnouncement",
                    !item.value,
                  );
                }}
                className={`relative h-6 w-11 rounded-full transition ${
                  item.value
                    ? "bg-indigo-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                    item.value
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Configuration Information */}
      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <SectionHeader
          title="Configuration Information"
          description="Information about the latest Global Settings update."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Last Updated By
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {form.updatedBy}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">
              Last Updated On
            </p>

            <p className="mt-1 text-sm font-medium text-slate-700">
              {form.updatedOn}
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={handleRefresh}
          disabled={
            updateMutation.isPending ||
            resetMutation.isPending
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshIcon />
          Refresh
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={
            updateMutation.isPending ||
            resetMutation.isPending
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ResetIcon />
          Reset
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={
            updateMutation.isPending ||
            resetMutation.isPending
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SaveIcon />
          {updateMutation.isPending
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
