import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AppRoutes from "./routes/AppRoutes";
import { employees as initialEmployees } from "./data/employees";
import type { Employee } from "./types";

function App() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedEmployees = localStorage.getItem("onecloud_employees");

    if (savedEmployees) {
      try {
        setEmployees(JSON.parse(savedEmployees) as Employee[]);
      } catch (error) {
        console.log("Could not load employees from localStorage");
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "onecloud_employees",
        JSON.stringify(employees)
      );
    }
  }, [employees, isLoaded]);

  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes
          employees={employees}
          setEmployees={setEmployees}
        />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
