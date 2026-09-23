import { employees as initialEmployees } from "../data/employees";
import type { Employee } from "../types";

const STORAGE_KEY = "onecloud_employees";

export const getEmployees = (): Employee[] => {
  const savedEmployees = localStorage.getItem(STORAGE_KEY);

  if (savedEmployees) {
    try {
      return JSON.parse(savedEmployees) as Employee[];
    } catch (error) {
      console.log("Could not load employees from localStorage");
    }
  }

  return initialEmployees;
};

export const addEmployee = (employee: Employee): Employee[] => {
  const currentEmployees = getEmployees();

  const updatedEmployees = [...currentEmployees, employee];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedEmployees),
  );

  return updatedEmployees;
};

export const updateEmployee = (updatedEmployee: Employee): Employee[] => {
  const currentEmployees = getEmployees();

  const updatedEmployees = currentEmployees.map((employee) =>
    employee.id === updatedEmployee.id ? updatedEmployee : employee,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedEmployees),
  );

  return updatedEmployees;
};

export const deleteEmployee = (id: number): Employee[] => {
  const currentEmployees = getEmployees();

  const updatedEmployees = currentEmployees.filter(
    (employee) => employee.id !== id,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedEmployees),
  );

  return updatedEmployees;
};