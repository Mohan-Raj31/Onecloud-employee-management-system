import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useOrganization } from "../../hooks/useOrganizations";

function ViewOrganization() {
  const navigate = useNavigate();
  const { id } = useParams();

  const organizationId = Number(id);

  const {
    data: organization,
    isLoading,
    isError,
  } = useOrganization(organizationId);

  if (isLoading) {
    return (
      <PageState title="Loading organization..." />
    );
  }

  if (isError || !organization) {
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
          View Organization
        </h1>

        <p className="mt-1 text-sm font-medium text-[#667085] max-[400px]:text-xs">
          View organization details
        </p>
      </section>

      {/* DETAILS */}
      <section className="rounded-[17px] border border-[#e5e7eb] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.05)] max-[600px]:p-4">

        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-red-900 max-[500px]:text-lg">
            Organization Information
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <DetailField
            label="Company Name"
            value={organization.name}
          />

          <DetailField
            label="Code"
            value={organization.code}
          />

          <DetailField
            label="Business Type"
            value={
              organization.businessType
            }
          />

          <DetailField
            label="Location"
            value={organization.location}
          />

          <div>
            <p className="mb-2 text-sm font-bold text-slate-700">
              Status
            </p>

            <span
              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-extrabold ${
                organization.status ===
                "Active"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {organization.status}
            </span>
          </div>

          <DetailField
            label="Created On"
            value={organization.createdAt}
          />

        </div>

        {/* ACTIONS */}
        <div className="mt-7 flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-5">

          <button
            type="button"
            onClick={() =>
              navigate("/organizations")
            }
            className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            Back
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/organizations/${organization.id}/edit`,
              )
            }
            className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.22)] transition hover:-translate-y-0.5"
          >
            Edit
          </button>

        </div>
      </section>
    </div>
  );
}

function DetailField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-bold text-slate-700">
        {label}
      </p>

      <div className="flex min-h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-700">
        {value}
      </div>
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

export default ViewOrganization;