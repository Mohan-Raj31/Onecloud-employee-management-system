import type { Employee } from "../types";

export const employees: Employee[] = [
  {
    id: 101,
    name: "John Smith",
    email: "john@onecloud.com",
    phone: "9876543210",
    department: "Development",
    designation: "Frontend Developer",
    joiningDate: "2025-01-15",
    status: "Active",
    image: "/images/employees/employee-01.jpg",
  },
  {
    id: 102,
    name: "Sarah",
    email: "sarah@onecloud.com",
    phone: "9876543211",
    department: "HR",
    designation: "HR Manager",
    joiningDate: "2024-08-20",
    status: "Active",
    image: "/images/employees/employee-02.jpg",
  },
  {
    id: 103,
    name: "David",
    email: "david@onecloud.com",
    phone: "9876543212",
    department: "Finance",
    designation: "Accountant",
    joiningDate: "2023-11-10",
    status: "Inactive",
    image: "/images/employees/employee-03.jpg",
  },
];
