import { useNavigate, useParams } from "react-router-dom";
import TenantForm from "../../components/tenant-management/TenantForm";
import { useTenant, useUpdateTenant } from "../../hooks/useTenants";
import type { TenantFormData } from "../../../types";

function EditTenant() {
  const navigate = useNavigate();
  const { id } = useParams();
  const tenantId = Number(id);
  const { data: tenant, isLoading, isError } = useTenant(tenantId);
  const mutation = useUpdateTenant();

  if (isLoading) return <State title="Loading tenant..." />;
  if (isError || !tenant) return <State title="Tenant not found" action={() => navigate("/tenants")} />;

  const handleSubmit = async (data: TenantFormData) => {
    await mutation.mutateAsync({ id: tenant.id, data });
    navigate("/tenants");
  };

  return (
    <div className="mx-auto w-full max-w-[1050px] space-y-6">
      <div><h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">Edit Tenant</h1><p className="mt-2 text-sm font-medium text-slate-500">Update organization details and subscription configuration.</p></div>
      <TenantForm tenant={tenant} submitLabel="Save Changes" isSubmitting={mutation.isPending} onSubmit={handleSubmit} onCancel={() => navigate("/tenants")} />
    </div>
  );
}

function State({ title, action }: { title: string; action?: () => void }) {
  return <div className="flex min-h-[420px] items-center justify-center"><div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"><p className="font-extrabold text-slate-800">{title}</p>{action && <button onClick={action} className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white">Back to Tenants</button>}</div></div>;
}

export default EditTenant;
