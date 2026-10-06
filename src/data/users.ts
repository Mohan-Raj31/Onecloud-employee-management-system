import type { User } from "../types";

export const userData: User[] = [
  {
    id: 1,
    firstName: "Arun",
    lastName: "Kumar",
    employeeId: "EMP001",
    email: "arun.kumar@onecloud.com",
    mobile: "9876543210",

    organization: "ABC Technologies",
    businessUnit: "Technology",
    department: "Information Technology",
    branch: "Hyderabad",

    username: "arun.kumar",
    role: "System Admin",
    reportingManager: "Rajesh Kumar",

    status: "Active",
    emailVerified: true,
    mobileVerified: true,

    createdAt: "30-Jul-2026",
  },

  {
    id: 2,
    firstName: "Priya",
    lastName: "Sharma",
    employeeId: "EMP002",
    email: "priya.sharma@onecloud.com",
    mobile: "9876543211",

    organization: "XYZ Industries",
    businessUnit: "Operations",
    department: "Human Resources",
    branch: "Bangalore",

    username: "priya.sharma",
    role: "HR Manager",
    reportingManager: "Anil Kumar",

    status: "Active",
    emailVerified: true,
    mobileVerified: true,

    createdAt: "28-Jul-2026",
  },

  {
    id: 3,
    firstName: "Rahul",
    lastName: "Verma",
    employeeId: "EMP003",
    email: "rahul.verma@onecloud.com",
    mobile: "9876543212",

    organization: "Global Solutions",
    businessUnit: "Finance",
    department: "Finance",
    branch: "Chennai",

    username: "rahul.verma",
    role: "Manager",
    reportingManager: "Suresh Kumar",

    status: "Inactive",
    emailVerified: true,
    mobileVerified: false,

    createdAt: "25-Jul-2026",
  },

  {
    id: 4,
    firstName: "Sneha",
    lastName: "Reddy",
    employeeId: "EMP004",
    email: "sneha.reddy@onecloud.com",
    mobile: "9876543213",

    organization: "ABC Technologies",
    businessUnit: "Technology",
    department: "Engineering",
    branch: "Hyderabad",

    username: "sneha.reddy",
    role: "Employee",
    reportingManager: "Arun Kumar",

    status: "Pending",
    emailVerified: false,
    mobileVerified: false,

    createdAt: "22-Jul-2026",
  },

  {
    id: 5,
    firstName: "Vijay",
    lastName: "Raj",
    employeeId: "EMP005",
    email: "vijay.raj@onecloud.com",
    mobile: "9876543214",

    organization: "XYZ Industries",
    businessUnit: "Operations",
    department: "Sales",
    branch: "Mumbai",

    username: "vijay.raj",
    role: "Employee",
    reportingManager: "Priya Sharma",

    status: "Active",
    emailVerified: true,
    mobileVerified: true,

    createdAt: "20-Jul-2026",
  },
];