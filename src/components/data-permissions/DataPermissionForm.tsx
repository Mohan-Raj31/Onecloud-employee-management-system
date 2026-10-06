import {
  useEffect,
  useState,
} from "react";

import type {
  DataPermission,
  DataPermissionFormData,
  DataPermissionType,
  DataScope,
  OwnershipRule,
} from "../../types";

import {
  branchOptions,
  businessUnitOptions,
  customerOptions,
  dataPermissionOrganizations,
  dataPermissionPolicyTypes,
  dataPermissionRoles,
  dataPermissionScopes,
  departmentOptions,
  locationOptions,
  ownershipRules,
  projectOptions,
  vendorOptions,
} from "../../data/dataPermissions";

interface Props {
  initialData?: DataPermission;

  submitLabel: string;

  isSubmitting?: boolean;

  onSubmit: (
    data: DataPermissionFormData,
  ) => void;

  onCancel: () => void;
}

const control =
  "w-full rounded-xl border border-[#d6deea] bg-[#f8faff] px-4 py-3 text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100";

const card =
  "rounded-2xl border border-[#dce4f2] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.06)] max-[650px]:p-4";

function DataPermissionForm({
  initialData,
  submitLabel,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: Props) {
  const [policyName, setPolicyName] =
    useState("");

  const [policyType, setPolicyType] =
    useState<DataPermissionType>(
      "Department-Based",
    );

  const [organization, setOrganization] =
    useState(
      dataPermissionOrganizations[0],
    );

  const [role, setRole] =
    useState(
      dataPermissionRoles[1],
    );

  const [status, setStatus] =
    useState<
      DataPermissionFormData["status"]
    >("Active");

  const [dataScopes, setDataScopes] =
    useState<DataScope[]>([
      "Organization",
      "Department",
    ]);

  const [department, setDepartment] =
    useState(
      departmentOptions[0],
    );

  const [businessUnit, setBusinessUnit] =
    useState(
      businessUnitOptions[0],
    );

  const [branch, setBranch] =
    useState(branchOptions[0]);

  const [project, setProject] =
    useState("");

  const [location, setLocation] =
    useState(locationOptions[0]);

  const [customer, setCustomer] =
    useState("");

  const [vendor, setVendor] =
    useState("");

  const [ownership, setOwnership] =
    useState<OwnershipRule[]>([
      "Own Records Only",
    ]);

  const [
    viewSubordinateRecords,
    setViewSubordinateRecords,
  ] = useState(false);

  const [
    approveSubordinateTransactions,
    setApproveSubordinateTransactions,
  ] = useState(false);

  useEffect(() => {
    if (!initialData) {
      return;
    }

    setPolicyName(
      initialData.policyName,
    );

    setPolicyType(
      initialData.policyType,
    );

    setOrganization(
      initialData.organization,
    );

    setRole(initialData.role);

    setStatus(initialData.status);

    setDataScopes(
      initialData.dataScopes,
    );

    setDepartment(
      initialData.department,
    );

    setBusinessUnit(
      initialData.businessUnit,
    );

    setBranch(initialData.branch);

    setProject(initialData.project);

    setLocation(initialData.location);

    setCustomer(initialData.customer);

    setVendor(initialData.vendor);

    setOwnership(
      initialData.ownershipRules,
    );

    setViewSubordinateRecords(
      initialData.viewSubordinateRecords,
    );

    setApproveSubordinateTransactions(
      initialData.approveSubordinateTransactions,
    );
  }, [initialData]);

  const toggle = <T,>(
    value: T,
    values: T[],
    setter: (next: T[]) => void,
  ) => {
    setter(
      values.includes(value)
        ? values.filter(
            (item) => item !== value,
          )
        : [...values, value],
    );
  };

  const reset = () => {
    if (initialData) {
      setPolicyName(
        initialData.policyName,
      );

      setPolicyType(
        initialData.policyType,
      );

      setOrganization(
        initialData.organization,
      );

      setRole(initialData.role);

      setStatus(initialData.status);

      setDataScopes(
        initialData.dataScopes,
      );

      setDepartment(
        initialData.department,
      );

      setBusinessUnit(
        initialData.businessUnit,
      );

      setBranch(initialData.branch);

      setProject(initialData.project);

      setLocation(initialData.location);

      setCustomer(initialData.customer);

      setVendor(initialData.vendor);

      setOwnership(
        initialData.ownershipRules,
      );

      setViewSubordinateRecords(
        initialData.viewSubordinateRecords,
      );

      setApproveSubordinateTransactions(
        initialData.approveSubordinateTransactions,
      );

      return;
    }

    setPolicyName("");

    setPolicyType(
      "Department-Based",
    );

    setOrganization(
      dataPermissionOrganizations[0],
    );

    setRole(
      dataPermissionRoles[1],
    );

    setStatus("Active");

    setDataScopes([
      "Organization",
      "Department",
    ]);

    setDepartment(
      departmentOptions[0],
    );

    setBusinessUnit(
      businessUnitOptions[0],
    );

    setBranch(
      branchOptions[0],
    );

    setProject("");

    setLocation(
      locationOptions[0],
    );

    setCustomer("");

    setVendor("");

    setOwnership([
      "Own Records Only",
    ]);

    setViewSubordinateRecords(false);

    setApproveSubordinateTransactions(
      false,
    );
  };

  const handleSubmit = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (
      !policyName.trim() ||
      !organization ||
      !role ||
      dataScopes.length === 0
    ) {
      return;
    }

    onSubmit({
      policyName:
        policyName.trim(),

      policyType,

      organization,

      role,

      status,

      dataScopes,

      department,

      businessUnit,

      branch,

      project,

      location,

      customer,

      vendor,

      ownershipRules:
        ownership,

      viewSubordinateRecords,

      approveSubordinateTransactions,

      accessibleRecords:
        initialData?.accessibleRecords ??
        0,

      restrictedRecords:
        initialData?.restrictedRecords ??
        0,

      createdBy:
        initialData?.createdBy ??
        "Super Admin",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* POLICY INFORMATION */}
      <section className={card}>
        <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
          POLICY INFORMATION
        </h2>

        <div className="grid grid-cols-2 gap-5 max-[650px]:grid-cols-1">
          <Field
            label="Policy Name"
            required
          >
            <input
              value={policyName}
              onChange={(event) =>
                setPolicyName(
                  event.target.value,
                )
              }
              placeholder="HR Department Data Access"
              className={control}
              required
            />
          </Field>

          <Field
            label="Policy Type"
            required
          >
            <select
              value={policyType}
              onChange={(event) =>
                setPolicyType(
                  event.target
                    .value as DataPermissionType,
                )
              }
              className={control}
            >
              {dataPermissionPolicyTypes.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field
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
              className={control}
            >
              {dataPermissionOrganizations.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field
            label="Role"
            required
          >
            <select
              value={role}
              onChange={(event) =>
                setRole(
                  event.target.value,
                )
              }
              className={control}
            >
              {dataPermissionRoles.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field label="Status">
            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target
                    .value as DataPermissionFormData["status"],
                )
              }
              className={control}
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </Field>
        </div>
      </section>

      {/* DATA SCOPE */}
      <section className={card}>
        <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
          DATA SCOPE
        </h2>

        <div className="grid grid-cols-4 gap-3 max-[900px]:grid-cols-2 max-[500px]:grid-cols-1">
          {dataPermissionScopes.map(
            (scope) => {
              const checked =
                dataScopes.includes(
                  scope,
                );

              return (
                <label
                  key={scope}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                    checked
                      ? "border-indigo-200 bg-indigo-50"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      toggle(
                        scope,
                        dataScopes,
                        setDataScopes,
                      )
                    }
                    className="h-4 w-4 accent-indigo-600"
                  />

                  <span className="text-sm font-semibold text-slate-700">
                    {scope}
                  </span>
                </label>
              );
            },
          )}
        </div>

        {dataScopes.length ===
          0 && (
          <p className="mt-3 text-xs font-semibold text-rose-600">
            Select at least one
            data scope.
          </p>
        )}
      </section>

      {/* ACCESS RULES */}
      <section className={card}>
        <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
          ACCESS RULES
        </h2>

        <div className="grid grid-cols-2 gap-5 max-[650px]:grid-cols-1">
          <Field label="Department">
            <select
              value={department}
              onChange={(event) =>
                setDepartment(
                  event.target.value,
                )
              }
              className={control}
            >
              {departmentOptions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field label="Business Unit">
            <select
              value={businessUnit}
              onChange={(event) =>
                setBusinessUnit(
                  event.target.value,
                )
              }
              className={control}
            >
              {businessUnitOptions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field label="Branch">
            <select
              value={branch}
              onChange={(event) =>
                setBranch(
                  event.target.value,
                )
              }
              className={control}
            >
              {branchOptions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field label="Project">
            <select
              value={project}
              onChange={(event) =>
                setProject(
                  event.target.value,
                )
              }
              className={control}
            >
              <option value="">
                Not specified
              </option>

              {projectOptions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field label="Location">
            <select
              value={location}
              onChange={(event) =>
                setLocation(
                  event.target.value,
                )
              }
              className={control}
            >
              {locationOptions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field label="Customer">
            <select
              value={customer}
              onChange={(event) =>
                setCustomer(
                  event.target.value,
                )
              }
              className={control}
            >
              <option value="">
                Not specified
              </option>

              {customerOptions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>

          <Field label="Vendor">
            <select
              value={vendor}
              onChange={(event) =>
                setVendor(
                  event.target.value,
                )
              }
              className={control}
            >
              <option value="">
                Not specified
              </option>

              {vendorOptions.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ),
              )}
            </select>
          </Field>
        </div>
      </section>

      {/* RECORD OWNERSHIP */}
      <section className={card}>
        <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
          RECORD OWNERSHIP
        </h2>

        <div className="grid grid-cols-2 gap-3 max-[650px]:grid-cols-1">
          {ownershipRules.map(
            (rule) => {
              const checked =
                ownership.includes(
                  rule,
                );

              return (
                <label
                  key={rule}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                    checked
                      ? "border-indigo-200 bg-indigo-50"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      toggle(
                        rule,
                        ownership,
                        setOwnership,
                      )
                    }
                    className="h-4 w-4 accent-indigo-600"
                  />

                  <span className="text-sm font-semibold text-slate-700">
                    {rule}
                  </span>
                </label>
              );
            },
          )}
        </div>
      </section>

      {/* MANAGER ACCESS */}
      <section className={card}>
        <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
          MANAGER ACCESS
        </h2>

        <div className="grid grid-cols-2 gap-3 max-[650px]:grid-cols-1">
          <CheckRow
            label="View Subordinate Records"
            checked={
              viewSubordinateRecords
            }
            onChange={
              setViewSubordinateRecords
            }
          />

          <CheckRow
            label="Approve Subordinate Transactions"
            checked={
              approveSubordinateTransactions
            }
            onChange={
              setApproveSubordinateTransactions
            }
          />
        </div>
      </section>

      {/* DATA PREVIEW */}
      <section className={card}>
        <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
          DATA PREVIEW
        </h2>

        <div className="grid grid-cols-2 gap-4 max-[650px]:grid-cols-1">
          <PreviewCard
            label="Accessible Records"
            value={
              initialData?.accessibleRecords ??
              0
            }
          />

          <PreviewCard
            label="Restricted Records"
            value={
              initialData?.restrictedRecords ??
              0
            }
          />
        </div>
      </section>

      {/* AUDIT */}
      {initialData && (
        <section className={card}>
          <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
            AUDIT INFORMATION
          </h2>

          <div className="grid grid-cols-3 gap-4 max-[650px]:grid-cols-1">
            <Info
              label="Created By"
              value={
                initialData.createdBy
              }
            />

            <Info
              label="Created Date"
              value={
                initialData.createdAt
              }
            />

            <Info
              label="Last Modified"
              value={
                initialData.updatedAt ??
                "Not modified"
              }
            />
          </div>
        </section>
      )}

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pb-6 max-[500px]:flex-col">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-3 text-sm font-bold text-indigo-600 hover:bg-indigo-100"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            isSubmitting ||
            dataScopes.length === 0
          }
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Saving..."
            : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-600">
        {label}

        {required && (
          <span className="ml-1 text-rose-500">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (
    value: boolean,
  ) => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
        checked
          ? "border-indigo-200 bg-indigo-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
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

      <span className="text-sm font-semibold text-slate-700">
        {label}
      </span>
    </label>
  );
}

function PreviewCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-[#d6deea] bg-[#f8faff] p-5">
      <p className="text-xs font-extrabold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-extrabold text-slate-800">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-600">
        {label}
      </p>

      <div className="rounded-xl border border-[#d6deea] bg-[#f8faff] px-4 py-3 text-sm font-medium text-slate-800">
        {value}
      </div>
    </div>
  );
}

export default DataPermissionForm;