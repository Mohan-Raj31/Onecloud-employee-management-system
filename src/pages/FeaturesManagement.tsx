import { useMemo, useState } from "react";

import type { Feature } from "../types";

import {
  useFeatures,
  useSetFeatureStatus,
  useUpdateFeature,
} from "../hooks/useFeatures";

function FeaturesManagement() {
  const {
    data: features = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useFeatures();

  const setFeatureStatus = useSetFeatureStatus();
  const updateFeature = useUpdateFeature();

  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] =
    useState("All Modules");
  const [planFilter, setPlanFilter] =
    useState("All License Plans");
  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [selectedFeature, setSelectedFeature] =
    useState<Feature | null>(null);

  const [configuration, setConfiguration] =
    useState("");

  const modules = useMemo(
    () => [
      "All Modules",
      ...Array.from(
        new Set(
          features.map(
            (feature) => feature.module,
          ),
        ),
      ),
    ],
    [features],
  );

  const licensePlans = useMemo(
    () => [
      "All License Plans",
      ...Array.from(
        new Set(
          features.map(
            (feature) =>
              feature.licensePlan,
          ),
        ),
      ),
    ],
    [features],
  );

  const filteredFeatures = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return features.filter((feature) => {
      const matchesSearch =
        !searchValue ||
        feature.name
          .toLowerCase()
          .includes(searchValue);

      const matchesModule =
        moduleFilter === "All Modules" ||
        feature.module === moduleFilter;

      const matchesPlan =
        planFilter === "All License Plans" ||
        feature.licensePlan === planFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        feature.status === statusFilter;

      return (
        matchesSearch &&
        matchesModule &&
        matchesPlan &&
        matchesStatus
      );
    });
  }, [
    features,
    search,
    moduleFilter,
    planFilter,
    statusFilter,
  ]);

  const totalFeatures = features.length;

  const enabledFeatures = features.filter(
    (feature) =>
      feature.status === "Enabled",
  ).length;

  const disabledFeatures = features.filter(
    (feature) =>
      feature.status === "Disabled",
  ).length;

  const handleStatusChange = (
    feature: Feature,
    status: Feature["status"],
  ) => {
    setFeatureStatus.mutate({
      id: feature.id,
      status,
    });
  };

  const handleConfigure = (
    feature: Feature,
  ) => {
    setSelectedFeature(feature);
    setConfiguration(
      feature.description ?? "",
    );
  };

  const handleSaveConfiguration = () => {
    if (!selectedFeature) {
      return;
    }

    updateFeature.mutate(
      {
        id: selectedFeature.id,
        data: {
          description: configuration,
        },
      },
      {
        onSuccess: () => {
          setSelectedFeature(null);
          setConfiguration("");
        },
      },
    );
  };

  const handleExport = () => {
    const headers = [
      "Feature Name",
      "Module",
      "License Plan",
      "Status",
    ];

    const rows = filteredFeatures.map(
      (feature) => [
        feature.name,
        feature.module,
        feature.licensePlan,
        feature.status,
      ],
    );

    const csv = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(
              /"/g,
              '""',
            )}"`,
          )
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "onecloud-feature-management.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    refetch();
  };

  const clearFilters = () => {
    setSearch("");
    setModuleFilter("All Modules");
    setPlanFilter("All License Plans");
    setStatusFilter("All Status");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading features...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
        Failed to load features.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[31px] font-extrabold tracking-[-1px] max-[650px]:text-[25px] bg-gradient-to-r from-blue-900 to-indigo-500 bg-clip-text text-transparent">
            Features Management
          </h1>
          <p className="mt-1 text-sm font-medium text-[#667085]">
            Manage platform features and availability
          </p>
        </div>

      </div>


      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total Features"
          value={totalFeatures}
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
              />
              <path d="M8 8h8M8 12h8M8 16h5" />
            </svg>
          }
          iconClass="bg-indigo-50 text-indigo-600"
        />

        <SummaryCard
          label="Enabled Features"
          value={enabledFeatures}
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          }
          iconClass="bg-emerald-50 text-emerald-600"
        />

        <SummaryCard
          label="Disabled Features"
          value={disabledFeatures}
          icon={
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          }
          iconClass="bg-red-50 text-red-600"
        />
      </div>


      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Search Feature
        </label>

        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search Feature..."
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FilterSelect
            label="Module"
            value={moduleFilter}
            options={modules}
            onChange={setModuleFilter}
          />

          <FilterSelect
            label="License Plan"
            value={planFilter}
            options={licensePlans}
            onChange={setPlanFilter}
          />

          <FilterSelect
            label="Status"
            value={statusFilter}
            options={[
              "All Status",
              "Enabled",
              "Disabled",
            ]}
            onChange={setStatusFilter}
          />
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={clearFilters}
            className="text-left text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Clear Filters
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              Export
            </button>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={isFetching}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M20 11a8 8 0 0 0-14.9-4M4 5v4h4" />
                <path d="M4 13a8 8 0 0 0 14.9 4M20 19v-4h-4" />
              </svg>
              {isFetching
                ? "Refreshing..."
                : "Refresh"}
            </button>
          </div>
        </div>
      </section>

      {/* Feature List */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Feature List
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage availability and configuration of platform features.
            </p>
          </div>

          <span className="text-sm text-slate-500">
            {filteredFeatures.length} feature
            {filteredFeatures.length === 1
              ? ""
              : "s"}
          </span>
        </div>

        {/* Desktop / Tablet table */}
        <div className="hidden overflow-x-auto xl:block">
          <table className="min-w-[900px] w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-left">
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Feature Name
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Module
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  License Plan
                </th>

                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredFeatures.map(
                (feature) => (
                  <FeatureTableRow
                    key={feature.id}
                    feature={feature}
                    onEnable={() =>
                      handleStatusChange(
                        feature,
                        "Enabled",
                      )
                    }
                    onDisable={() =>
                      handleStatusChange(
                        feature,
                        "Disabled",
                      )
                    }
                    onConfigure={() =>
                      handleConfigure(feature)
                    }
                    isUpdating={
                      setFeatureStatus.isPending ||
                      updateFeature.isPending
                    }
                  />
                ),
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-3 p-4 xl:hidden">
          {filteredFeatures.map(
            (feature) => (
              <FeatureMobileCard
                key={feature.id}
                feature={feature}
                onEnable={() =>
                  handleStatusChange(
                    feature,
                    "Enabled",
                  )
                }
                onDisable={() =>
                  handleStatusChange(
                    feature,
                    "Disabled",
                  )
                }
                onConfigure={() =>
                  handleConfigure(feature)
                }
                isUpdating={
                  setFeatureStatus.isPending ||
                  updateFeature.isPending
                }
              />
            ),
          )}
        </div>

        {filteredFeatures.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="text-sm font-medium text-slate-600">
              No features found
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </section>

      {/* Configure Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Configure Feature
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedFeature.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedFeature(null)
                }
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ReadOnlyField
                  label="Module"
                  value={
                    selectedFeature.module
                  }
                />

                <ReadOnlyField
                  label="License Plan"
                  value={
                    selectedFeature.licensePlan
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Feature Configuration
                </label>

                <textarea
                  value={configuration}
                  onChange={(event) =>
                    setConfiguration(
                      event.target.value,
                    )
                  }
                  rows={5}
                  placeholder="Enter feature configuration..."
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() =>
                  setSelectedFeature(null)
                }
                className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleSaveConfiguration
                }
                disabled={
                  updateFeature.isPending
                }
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-indigo-700 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {updateFeature.isPending
                  ? "Saving..."
                  : "Save Configuration"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type SummaryCardProps = {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconClass: string;
};

function SummaryCard({
  label,
  value,
  icon,
  iconClass,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-800">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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

type StatusButtonProps = {
  label: string;
  onClick: () => void;
  disabled: boolean;
  active: boolean;
};

function StatusButton({
  label,
  onClick,
  disabled,
  active,
}: StatusButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || active}
      className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
        active
          ? "cursor-default bg-slate-100 text-slate-400"
          : label === "Enable"
            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            : "bg-red-50 text-red-700 hover:bg-red-100"
      } disabled:cursor-not-allowed`}
    >
      {label}
    </button>
  );
}

type FeatureTableRowProps = {
  feature: Feature;
  onEnable: () => void;
  onDisable: () => void;
  onConfigure: () => void;
  isUpdating: boolean;
};

function FeatureTableRow({
  feature,
  onEnable,
  onDisable,
  onConfigure,
  isUpdating,
}: FeatureTableRowProps) {
  return (
    <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70">
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-slate-800">
            {feature.name}
          </p>

          {feature.description && (
            <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
              {feature.description}
            </p>
          )}
        </div>
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {feature.module}
      </td>

      <td className="px-5 py-4 text-sm text-slate-600">
        {feature.licensePlan}
      </td>

      <td className="px-5 py-4">
        <StatusBadge
          status={feature.status}
        />
      </td>

      <td className="px-5 py-4">
        <div className="flex flex-wrap justify-end gap-2">
          <StatusButton
            label="Enable"
            onClick={onEnable}
            disabled={isUpdating}
            active={
              feature.status === "Enabled"
            }
          />

          <StatusButton
            label="Disable"
            onClick={onDisable}
            disabled={isUpdating}
            active={
              feature.status === "Disabled"
            }
          />

          <button
            type="button"
            onClick={onConfigure}
            className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
          >
            Configure
          </button>
        </div>
      </td>
    </tr>
  );
}

type FeatureMobileCardProps = {
  feature: Feature;
  onEnable: () => void;
  onDisable: () => void;
  onConfigure: () => void;
  isUpdating: boolean;
};

function FeatureMobileCard({
  feature,
  onEnable,
  onDisable,
  onConfigure,
  isUpdating,
}: FeatureMobileCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-800">
            {feature.name}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {feature.module}
          </p>
        </div>

        <StatusBadge
          status={feature.status}
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Module
          </p>

          <p className="mt-1 text-sm text-slate-700">
            {feature.module}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            License Plan
          </p>

          <p className="mt-1 text-sm text-slate-700">
            {feature.licensePlan}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <StatusButton
          label="Enable"
          onClick={onEnable}
          disabled={isUpdating}
          active={
            feature.status === "Enabled"
          }
        />

        <StatusButton
          label="Disable"
          onClick={onDisable}
          disabled={isUpdating}
          active={
            feature.status === "Disabled"
          }
        />

        <button
          type="button"
          onClick={onConfigure}
          className="rounded-lg bg-indigo-50 px-2 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
        >
          Configure
        </button>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Feature["status"];
}) {
  const enabled =
    status === "Enabled";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        enabled
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          enabled
            ? "bg-emerald-500"
            : "bg-red-500"
        }`}
      />

      {status}
    </span>
  );
}

function ReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-600">
        {value}
      </div>
    </div>
  );
}

export default FeaturesManagement;
