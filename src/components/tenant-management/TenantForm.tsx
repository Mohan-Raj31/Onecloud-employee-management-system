import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { Tenant, TenantFormData } from "../../types";

interface TenantFormProps {
  tenant?: Tenant;
  isSubmitting?: boolean;
  submitLabel: string;
  onSubmit: (data: TenantFormData) => Promise<void> | void;
  onCancel: () => void;
}

type Errors = Partial<Record<keyof TenantFormData, string>>;

const inputClass = "h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50";
const labelClass = "text-xs font-bold text-slate-700";

function TenantForm({ tenant, isSubmitting, submitLabel, onSubmit, onCancel }: TenantFormProps) {
  const [form, setForm] = useState<TenantFormData>({
    name: tenant?.name ?? "",
    code: tenant?.code ?? "",
    adminName: tenant?.adminName ?? "",
    adminEmail: tenant?.adminEmail ?? "",
    phone: tenant?.phone ?? "",
    subscription: tenant?.subscription ?? "Enterprise",
    country: tenant?.country ?? "India",
    timeZone: tenant?.timeZone ?? "Asia/Kolkata",
    status: tenant?.status ?? "Active",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!tenant) return;
    setForm({
      name: tenant.name,
      code: tenant.code,
      adminName: tenant.adminName,
      adminEmail: tenant.adminEmail,
      phone: tenant.phone,
      subscription: tenant.subscription,
      country: tenant.country,
      timeZone: tenant.timeZone,
      status: tenant.status,
    });
  }, [tenant]);

  const updateField = <K extends keyof TenantFormData>(field: K, value: TenantFormData[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  };

  const validate = () => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Tenant name is required";
    if (!form.code.trim()) next.code = "Tenant code is required";
    if (!form.adminName.trim()) next.adminName = "Admin name is required";
    if (!form.adminEmail.trim()) next.adminEmail = "Admin email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.adminEmail)) next.adminEmail = "Enter a valid email address";
    if (!form.phone.trim()) next.phone = "Phone is required";
    else if (!/^\d{10}$/.test(form.phone)) next.phone = "Phone must contain 10 digits";
    if (!form.subscription) next.subscription = "Subscription is required";
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    try {
      await onSubmit({ ...form, name: form.name.trim(), code: form.code.trim().toUpperCase(), adminName: form.adminName.trim(), adminEmail: form.adminEmail.trim() });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to save tenant");
    }
  };

  const field = (name: keyof TenantFormData, label: string, element: ReactNode) => (
    <div className="space-y-2">
      <label className={labelClass}>{label}</label>
      {element}
      {errors[name] && <p className="text-[11px] font-semibold text-rose-600">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-7">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {field("name", "Tenant Name", <input className={inputClass} value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Acme Corporation" />)}
        {field("code", "Tenant Code", <input className={`${inputClass} uppercase`} value={form.code} onChange={(e) => updateField("code", e.target.value.toUpperCase())} placeholder="ACM001" />)}
        {field("adminName", "Admin Name", <input className={inputClass} value={form.adminName} onChange={(e) => updateField("adminName", e.target.value)} placeholder="John Smith" />)}
        {field("adminEmail", "Admin Email", <input className={inputClass} type="email" value={form.adminEmail} onChange={(e) => updateField("adminEmail", e.target.value)} placeholder="john@acme.com" />)}
        {field("phone", "Phone", <input className={inputClass} inputMode="numeric" value={form.phone} onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="9876543210" />)}
        {field("subscription", "Subscription", <select className={inputClass} value={form.subscription} onChange={(e) => updateField("subscription", e.target.value as TenantFormData["subscription"])}><option value="Enterprise">Enterprise</option><option value="Pro">Pro</option><option value="Basic">Basic</option></select>)}
        {field("country", "Country", <select className={inputClass} value={form.country} onChange={(e) => updateField("country", e.target.value)}><option>India</option><option>United States</option><option>United Kingdom</option><option>Singapore</option><option>Australia</option></select>)}
        {field("timeZone", "Time Zone", <select className={inputClass} value={form.timeZone} onChange={(e) => updateField("timeZone", e.target.value)}><option>Asia/Kolkata</option><option>America/New_York</option><option>Europe/London</option><option>Asia/Singapore</option><option>Australia/Sydney</option></select>)}
        {field("status", "Status", <select className={inputClass} value={form.status} onChange={(e) => updateField("status", e.target.value as TenantFormData["status"])}><option value="Active">Active</option><option value="Inactive">Inactive</option></select>)}
      </div>

      {submitError && <div className="mt-5 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{submitError}</div>}

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition hover:bg-slate-50">Cancel</button>
        <button disabled={isSubmitting} type="submit" className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(79,70,229,0.2)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Saving..." : submitLabel}</button>
      </div>
    </form>
  );
}

export default TenantForm;
