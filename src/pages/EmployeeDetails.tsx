import { useParams, useNavigate } from "react-router-dom";
import type { Employee } from "../types";

interface EmployeeDetailsProps {
  employees: Employee[];
}

function EmployeeDetails({ employees }: EmployeeDetailsProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const employee = employees.find(
    (employee) => employee.id === Number(id)
  );

  if (!employee) {
    return <h2>Employee not found</h2>;
  }

  return (
    <div className="employee-details">
      <h1>Employee Details</h1>

      <div className="details-card">
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
            employee.name
          )}&size=150`}
          alt={employee.name}
        />

        <h2>{employee.name}</h2>
        <p>{employee.designation}</p>

        <p>
          <strong>Employee ID:</strong> {employee.id}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Phone:</strong> {employee.phone}
        </p>
        <p>
          <strong>Department:</strong> {employee.department}
        </p>
        <p>
          <strong>Joining Date:</strong> {employee.joiningDate}
        </p>
        <p>
          <strong>Status:</strong> {employee.status}
        </p>

        <div className="details-buttons">
          <button
            onClick={() => navigate(`/employees/${employee.id}/edit`)}
          >
            Edit Employee
          </button>

          <button onClick={() => navigate("/employees")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
