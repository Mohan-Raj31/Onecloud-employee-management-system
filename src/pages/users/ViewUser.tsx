import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUsers";

function ViewUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const userId = Number(id);

  const {
    data: user,
    isLoading,
    isError,
  } = useUser(userId);

  if (isLoading) {
    return <PageState title="Loading user..." />;
  }

  if (isError || !user) {
    return (
      <PageState
        title="User not found"
        actionLabel="Back to Users"
        onAction={() => navigate("/users")}
      />
    );
  }

  return (
    <section className="mx-auto w-full max-w-[1100px]">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-[28px] font-extrabold tracking-[-0.7px] text-transparent max-[650px]:text-[23px]">
          View User
        </h1>

        <p className="mt-1 text-sm text-[#667085]">
          View user information and account details
        </p>
      </div>

      {/* USER INFORMATION */}
      <InfoSection title="USER INFORMATION">
        <Info
          label="First Name"
          value={user.firstName}
        />

        <Info
          label="Last Name"
          value={user.lastName}
        />

        <Info
          label="Employee ID"
          value={user.employeeId}
        />

        <Info
          label="Email Address"
          value={user.email}
        />

        <Info
          label="Mobile Number"
          value={user.mobile || "-"}
          full
        />
      </InfoSection>

      {/* ORGANIZATION DETAILS */}
      <InfoSection title="ORGANIZATION DETAILS">
        <Info
          label="Organization"
          value={user.organization}
        />

        <Info
          label="Business Unit"
          value={user.businessUnit || "-"}
        />

        <Info
          label="Department"
          value={user.department || "-"}
        />

        <Info
          label="Branch"
          value={user.branch || "-"}
        />
      </InfoSection>

      {/* ACCESS INFORMATION */}
      <InfoSection title="ACCESS INFORMATION">
        <Info
          label="Username"
          value={user.username}
        />

        <Info
          label="Role"
          value={user.role}
        />

        <Info
          label="Reporting Manager"
          value={user.reportingManager || "-"}
          full
        />
      </InfoSection>

      {/* ACCOUNT STATUS */}
      <InfoSection title="ACCOUNT STATUS">
        <Info
          label="Status"
          value={user.status}
        />

        <Info
          label="Email Verification"
          value={
            user.emailVerified
              ? "Verified"
              : "Not Verified"
          }
        />

        <Info
          label="Mobile Verification"
          value={
            user.mobileVerified
              ? "Verified"
              : "Not Verified"
          }
        />
      </InfoSection>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pb-6 max-[500px]:flex-col">
        <button
          type="button"
          onClick={() => navigate("/users")}
          className="rounded-xl border border-[#cbd5e1] bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={() =>
            navigate(`/users/edit/${user.id}`)
          }
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3 text-sm font-bold text-white shadow-md"
        >
          Edit User
        </button>
      </div>
    </section>
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
    <div className="mb-6 rounded-2xl border border-[#dce4f2] bg-white p-6 shadow-[0_8px_25px_rgba(15,23,42,0.06)] max-[650px]:p-4">
      <h2 className="mb-5 text-[17px] font-extrabold text-[#312e81]">
        {title}
      </h2>

      <div className="grid grid-cols-2 gap-5 max-[650px]:grid-cols-1">
        {children}
      </div>
    </div>
  );
}

function Info({
  label,
  value,
  full = false,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div
      className={
        full
          ? "col-span-2 max-[650px]:col-span-1"
          : ""
      }
    >
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

        {actionLabel && onAction && (
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

export default ViewUser;
