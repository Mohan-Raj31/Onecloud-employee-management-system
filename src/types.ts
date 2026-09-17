export type Department = "Development" | "HR" | "Finance" | "CRM";
export type EmployeeStatus = "Active" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: Department;
  designation: string;
  joiningDate: string;
  status: EmployeeStatus;
  image?: string;
}

export interface EmployeeFormData {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: EmployeeStatus;
}

import type { Dispatch, SetStateAction } from "react";

export type SetEmployees = Dispatch<SetStateAction<Employee[]>>;
