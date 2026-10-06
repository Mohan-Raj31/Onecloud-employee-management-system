import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useDataPermission,
} from "../../hooks/useDataPermissions";

function ViewDataPermission() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const {
    data: policy,
    isLoading,
    isError,
  } = useDataPermission(
    Number(id),
  );

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

  return (
    <div className="mx-auto w-full max-w-[1100px]">
      {/* HEADER */}
      <section className="mb-6 flex items-start justify-between gap-4 max-[650px]:flex-col">
        <div>
          <h1 className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-[28px] font-extrabold text-transparent max-[650px]:text-[23px]">
            View Data Permission
          </h1>

          <p className="mt-1 text-sm text-[#667085]">
            View data access
            policy details
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/data-permissions/edit/${policy.id}`,
            )
          }
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] max-[650px]:w-full"
        >
          Edit Policy
        </button>
      </section>

      {/* POLICY */}
      <InfoSection
        title="POLICY INFORMATION"
      >
        <Info
          label="Policy Name"
          value={
            policy.policyName
          }
        />

        <Info
          label="Policy Type"
          value={
            policy.policyType
          }
        />

        <Info
          label="Organization"
          value={
            policy.organization
          }
        />

        <Info
          label="Role"
          value={policy.role}
        />

        <Info
          label="Status"
          value={policy.status}
        />
      </InfoSection>

      {/* DATA SCOPE */}
      <InfoSection title="DATA SCOPE">
        <div className="col-span-2 flex flex-wrap gap-2 max-[650px]:col-span-1">
          {policy.dataScopes.map(
            (scope) => (
              <span
                key={scope}
                className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600"
              >
                ✓ {scope}
              </span>
            ),
          )}
        </div>
      </InfoSection>

      {/* ACCESS RULES */}
      <InfoSection title="ACCESS RULES">
        <Info
          label="Department"
          value={
            policy.department ||
            "Not specified"
          }
        />

        <Info
          label="Business Unit"
          value={
            policy.businessUnit ||
            "Not specified"
          }
        />

        <Info
          label="Branch"
          value={
            policy.branch ||
            "Not specified"
          }
        />

        <Info
          label="Project"
          value={
            policy.project ||
            "Not specified"
          }
        />

        <Info
          label="Location"
          value={
            policy.location ||
            "Not specified"
          }
        />

        <Info
          label="Customer"
          value={
            policy.customer ||
            "Not specified"
          }
        />

        <Info
          label="Vendor"
          value={
            policy.vendor ||
            "Not specified"
          }
        />
      </InfoSection>

      {/* OWNERSHIP */}
      <InfoSection
        title="RECORD OWNERSHIP"
      >
        <div className="col-span-2 flex flex-wrap gap-2 max-[650px]:col-span-1">
          {policy.ownershipRules.map(
            (rule) => (
              <span
                key={rule}
                className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600"
              >
                ✓ {rule}
              </span>
            ),
          )}
        </div>
      </InfoSection>

      {/* MANAGER ACCESS */}
      <InfoSection
        title="MANAGER ACCESS"
      >
        <Info
          label="View Subordinate Records"
          value={
            policy.viewSubordinateRecords
              ? "Enabled"
              : "Disabled"
          }
        />

        <Info
          label="Approve Subordinate Transactions"
          value={
            policy.approveSubordinateTransactions
              ? "Enabled"
              : "Disabled"
          }
        />
      </InfoSection>

      {/* DATA PREVIEW */}
      <InfoSection
        title="DATA PREVIEW"
      >
        <Info
          label="Accessible Records"
          value={policy.accessibleRecords.toLocaleString()}
        />

        <Info
          label="Restricted Records"
          value={policy.restrictedRecords.toLocaleString()}
        />
      </InfoSection>

      {/* AUDIT */}
      <InfoSection
        title="AUDIT INFORMATION"
      >
        <Info
          label="Created By"
          value={
            policy.createdBy
          }
        />

        <Info
          label="Created Date"
          value={
            policy.createdAt
          }
        />

        <Info
          label="Last Modified"
          value={
            policy.updatedAt ??
            "Not modified"
          }
        />
      </InfoSection>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pb-6 max-[500px]:flex-col">
        <button
          type="button"
          onClick={() =>
            navigate(
              "/data-permissions",
            )
          }
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/data-permissions/edit/${policy.id}`,
            )
          }
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3 text-sm font-bold text-white"
        >
          Edit Policy
        </button>
      </div>
    </div>
  );
}

function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-2xl border border-[#dce4f2] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.06)] max-[650px]:p-4">
      <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-5 max-[650px]:grid-cols-1">
        {children}
      </div>
    </section>
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

export default ViewDataPermission;
