import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { Employee, EmployeeFormData, SetEmployees } from "../../types";

interface EmployeeFormProps {
  employees: Employee[];
  setEmployees: SetEmployees;
  employee?: Employee;
  isEdit?: boolean;
}

type FormErrors = Partial<Record<keyof EmployeeFormData, string>>;

function EmployeeForm({
  employees,
  setEmployees,
  employee,
  isEdit = false,
}: EmployeeFormProps) {
  const navigate = useNavigate();

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (isEdit) {
        setEmployees((previousEmployees) =>
          previousEmployees.map((previousEmployee) =>
            previousEmployee.id === Number(formData.id)
              ? {
                  ...formData,
                  id: Number(formData.id),
                  department: formData.department as Employee["department"],
                }
              : previousEmployee,
          ),
        );

        navigate("/employees");
      } else {
        const newEmployee: Employee = {
          ...formData,
          id: Number(formData.id),
          department: formData.department as Employee["department"],
        };

        setEmployees((previousEmployees) => [
          ...previousEmployees,
          newEmployee,
        ]);

        navigate("/employees");
      }
    }
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Employee ID</label>
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />
        {errors.id && <p className="error">{errors.id}</p>}
      </div>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>

      <div className="form-group">
        <label>Department</label>
        <select
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

        {errors.department && <p className="error">{errors.department}</p>}
      </div>

      <div className="form-group">
        <label>Designation</label>
        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />
        {errors.designation && <p className="error">{errors.designation}</p>}
      </div>

      <div className="form-group">
        <label>Date of Joining</label>
        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
        />
        {errors.joiningDate && <p className="error">{errors.joiningDate}</p>}
      </div>

      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="form-buttons">
        <button type="submit">
          {isEdit ? "Update Employee" : "Save Employee"}
        </button>
        <button type="button" onClick={() => navigate("/employees")}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
