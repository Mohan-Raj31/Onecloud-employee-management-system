import { useNavigate, useParams } from "react-router-dom";
import TenantStatusBadge from "../../components/tenant-management/TenantStatusBadge";
import { useActivateTenant, useDeactivateTenant, useTenant, useTenantStats } from "../../hooks/useTenants";

function TenantDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const tenantId = Number(id);
  const { data: tenant, isLoading, isError } = useTenant(tenantId);
  const { data: stats } = useTenantStats(tenantId);
  const activateMutation = useActivateTenant();
  const deactivateMutation = useDeactivateTenant();

  if (isLoading) return <State title="Loading tenant details..." />;
  if (isError || !tenant) return <State title="Tenant not found" action={() => navigate("/tenants")} />;

  const isPending = activateMutation.isPending || deactivateMutation.isPending;

  const toggleStatus = async () => {
    if (tenant.status === "Active") await deactivateMutation.mutateAsync(tenant.id);
    else await activateMutation.mutateAsync(tenant.id);
  };

  return (
    <div className="mx-auto w-full max-w-[1180px] space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button onClick={() => navigate("/tenants")} className="mb-4 text-xs font-bold text-indigo-600 hover:text-indigo-800">← Back to Tenants</button>

          <div className="mt-1 flex flex-wrap items-center gap-3"><h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{tenant.name}</h1><TenantStatusBadge status={tenant.status} /></div>
          <p className="mt-2 text-sm font-bold text-slate-500">{tenant.code}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => navigate(`/tenants/${tenant.id}/edit`)} className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50">Edit Tenant</button>
          <button disabled={isPending} onClick={toggleStatus} className={`h-10 rounded-xl px-4 text-sm font-bold text-white shadow-sm disabled:opacity-50 ${tenant.status === "Active" ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"}`}>{tenant.status === "Active" ? "Deactivate Tenant" : "Activate Tenant"}</button>
        </div>
      </div>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <SectionTitle title="Tenant Information" />
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Info label="Admin" value={tenant.adminName} />
            <Info label="Email" value={tenant.adminEmail} />
            <Info label="Phone" value={tenant.phone} />
            <Info label="Plan" value={tenant.subscription} />
            <Info label="Country" value={tenant.country} />
            <Info label="Time Zone" value={tenant.timeZone} />
            <Info label="Created" value={new Date(tenant.createdAt).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })} />
            <Info label="License" value={tenant.licenseActive ? "Active" : "Inactive"} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
          <SectionTitle title="Statistics" />
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Stat label="Users" value={(stats?.users ?? tenant.users).toLocaleString()} />
            <Stat label="Organizations" value={(stats?.organizations ?? tenant.organizations).toLocaleString()} />
            <Stat label="Active Users" value={(stats?.activeUsers ?? tenant.activeUsers).toLocaleString()} />
            <Stat label="Storage" value={`${stats?.storageUsed ?? tenant.storageUsed}%`} />
          </div>
        </div>
      </section>

    </div>
  );
}

function SectionTitle({ title }: { title: string }) { return <h2 className="text-lg font-extrabold text-slate-900">{title}</h2>; }
function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5"><p className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-400">{label}</p><p className="mt-1 text-sm font-bold text-slate-700 break-words">{value}</p></div>; }
function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-slate-100 bg-slate-50 p-4"><p className="text-xs font-semibold text-slate-500">{label}</p><p className="mt-2 text-2xl font-extrabold text-slate-900">{value}</p></div>; }
function State({ title, action }: { title: string; action?: () => void }) { return <div className="flex min-h-[420px] items-center justify-center"><div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"><p className="font-extrabold text-slate-800">{title}</p>{action && <button onClick={action} className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white">Back to Tenants</button>}</div></div>; }

export default TenantDetails;
