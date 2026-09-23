import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "../../hooks/useEmployees";
import type { Employee, EmployeeFormData } from "../../types";

interface EmployeeFormProps {
  employee?: Employee;
  isEdit?: boolean;
}

type FormErrors = Partial<Record<keyof EmployeeFormData, string>>;

const fieldClassName = `
  h-[46px] w-full rounded-[9px]
  border border-[#dfe3eb] bg-white
  px-[14px] text-[13px] text-[#172033]
  outline-none transition-all duration-200
  hover:border-[#c4cad5]
  focus:border-[#6366f1]
  focus:shadow-[0_0_0_4px_rgba(99,102,241,0.09)]
`;

function EmployeeForm({
  employee,
  isEdit = false,
}: EmployeeFormProps) {
  const navigate = useNavigate();

  const {
    employees,
    addEmployee,
    updateEmployee,
  } = useEmployees();

  const [formData, setFormData] = useState<EmployeeFormData>(
    employee
      ? {
          ...employee,
          id: String(employee.id),
          department: employee.department,
        }
      : {
          id: "",
          name: "",
          email: "",
          phone: "",
          department: "",
          designation: "",
          joiningDate: "",
          status: "Active",
        },
  );

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof EmployeeFormData;

    setFormData((previous) => ({
      ...previous,
      [fieldName]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [fieldName]: undefined,
    }));
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.id.trim()) {
      newErrors.id = "Employee ID is required";
    } else {
      const idExists = employees.some(
        (existingEmployee) =>
          existingEmployee.id === Number(formData.id) &&
          (!isEdit || existingEmployee.id !== employee?.id),
      );

      if (idExists) {
        newErrors.id = "Employee ID already exists";
      }
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = "Joining date is required";
    }

    return newErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) {
      return;
    }

    const employeeData: Employee = {
      ...formData,
      id: Number(formData.id),
      department: formData.department as Employee["department"],
    };

    try {
  if (isEdit) {
    await updateEmployee(employeeData);
  } else {
    await addEmployee(employeeData);
  }

  navigate("/employees");
} catch (error) {
  console.error("Employee operation failed:", error);
}
  };

  const groupClassName = "flex min-w-0 flex-col gap-2";
  const labelClassName = "text-[12px] font-bold text-[#344054]";
  const errorClassName =
    "text-[11px] font-semibold leading-[1.4] text-[#dc2626]";

  return (
    <form
      className="
        grid w-full grid-cols-2 gap-[21px]
        rounded-[20px] border border-[#e4e8f0]
        bg-gradient-to-br from-white via-white to-[#f7f8ff]
        p-8
        shadow-[0_14px_40px_rgba(15,23,42,0.07)]
        max-[850px]:grid-cols-1
        max-[650px]:gap-[17px] max-[650px]:rounded-[16px] max-[650px]:p-[22px]
        max-[400px]:p-[18px]
      "
      onSubmit={handleSubmit}
    >
      <div className={groupClassName}>
        <label className={labelClassName}>Employee ID</label>

        <input
          className={fieldClassName}
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />

        {errors.id && <p className={errorClassName}>{errors.id}</p>}
      </div>

      <div className={groupClassName}>
        <label className={labelClassName}>Full Name</label>

        <input
          className={fieldClassName}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        {errors.name && <p className={errorClassName}>{errors.name}</p>}
      </div>

      <div className={groupClassName}>
        <label className={labelClassName}>Email</label>

        <input
          className={fieldClassName}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        {errors.email && <p className={errorClassName}>{errors.email}</p>}
      </div>

      <div className={groupClassName}>
        <label className={labelClassName}>Phone</label>

        <input
          className={fieldClassName}
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        {errors.phone && <p className={errorClassName}>{errors.phone}</p>}
      </div>

      <div className={groupClassName}>
        <label className={labelClassName}>Department</label>

        <select
          className={fieldClassName}
          name="department"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">Select Department</option>
          <option value="Development">Development</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
          <option value="CRM">CRM</option>
        </select>

        {errors.department && (
          <p className={errorClassName}>{errors.department}</p>
        )}
      </div>

      <div className={groupClassName}>
        <label className={labelClassName}>Designation</label>

        <input
          className={fieldClassName}
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />

        {errors.designation && (
          <p className={errorClassName}>{errors.designation}</p>
        )}
      </div>

      <div className={groupClassName}>
        <label className={labelClassName}>Date of Joining</label>

        <input
          className={fieldClassName}
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
        />

        {errors.joiningDate && (
          <p className={errorClassName}>{errors.joiningDate}</p>
        )}
      </div>

      <div className={groupClassName}>
        <label className={labelClassName}>Status</label>

        <select
          className={fieldClassName}
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div
        className="
          col-span-full mt-2 flex justify-end gap-[11px]
          border-t border-[#edf0f4] pt-[23px]
          max-[850px]:col-auto
          max-[650px]:mt-1 max-[650px]:flex-col-reverse
        "
      >
        <button
          type="submit"
          className="
            min-h-[43px] min-w-[145px] rounded-[9px]
            border-0 bg-gradient-to-br from-[#4f46e5] via-[#6366f1] to-[#7c3aed]
            px-[18px] text-[12px] font-bold text-white
            shadow-[0_8px_20px_rgba(79,70,229,0.22)]
            transition-all duration-200
            hover:-translate-y-[2px]
            hover:shadow-[0_12px_25px_rgba(79,70,229,0.3)]
            max-[650px]:w-full
          "
        >
          {isEdit ? "Update Employee" : "Save Employee"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/employees")}
          className="
            min-h-[43px] min-w-[145px] rounded-[9px]
            border border-[#dfe3eb] bg-white px-[18px]
            text-[12px] font-bold text-[#475467]
            transition-all duration-200
            hover:border-[#c7ccd5] hover:bg-[#f8fafc] hover:text-[#344054]
            max-[650px]:w-full
          "
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
