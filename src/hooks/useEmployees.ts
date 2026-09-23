import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

import type { Employee } from "../types";

const EMPLOYEES_QUERY_KEY = ["employees"];

export const useEmployees = () => {
  const queryClient = useQueryClient();

  const employeesQuery = useQuery({
    queryKey: EMPLOYEES_QUERY_KEY,
    queryFn: getEmployees,
  });

  const addEmployeeMutation = useMutation({
    mutationFn: async (employee: Employee) => addEmployee(employee),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEY,
      });
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: async (employee: Employee) => updateEmployee(employee),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEY,
      });
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id: number) => deleteEmployee(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEY,
      });
    },
  });

  return {
    employees: employeesQuery.data ?? [],

    isLoading: employeesQuery.isLoading,
    isError: employeesQuery.isError,

    addEmployee: addEmployeeMutation.mutateAsync,
    updateEmployee: updateEmployeeMutation.mutateAsync,
    deleteEmployee: deleteEmployeeMutation.mutateAsync,

    isAdding: addEmployeeMutation.isPending,
    isUpdating: updateEmployeeMutation.isPending,
    isDeleting: deleteEmployeeMutation.isPending,
  };
};