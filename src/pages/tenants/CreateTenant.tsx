import { useNavigate } from "react-router-dom";
import TenantForm from "../../components/tenant-management/TenantForm";
import { useCreateTenant } from "../../hooks/useTenants";
import type { TenantFormData } from "../../types";

function CreateTenant() {
  const navigate = useNavigate();
  const mutation = useCreateTenant();

  const handleSubmit = async (data: TenantFormData) => {
    await mutation.mutateAsync(data);
    navigate("/tenants");
  };

  return (
    <div className="mx-auto w-full max-w-[1050px] space-y-6">
      <PageHeader title="Create New Tenant" description="Onboard a new organization and configure its platform access." />
      <TenantForm submitLabel="Create Tenant" isSubmitting={mutation.isPending} onSubmit={handleSubmit} onCancel={() => navigate("/tenants")} />
    </div>
  );
}

function PageHeader({ title, description }: { title: string; description: string }) {
  return <div><h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">{title}</h1><p className="mt-2 text-sm font-medium text-slate-500">{description}</p></div>;
}

export default CreateTenant;
