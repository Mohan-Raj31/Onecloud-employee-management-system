import { useNavigate } from "react-router-dom";
import type { Employee } from "../../types";

interface EmployeeCardProps {
  employee: Employee;
  onDelete: (id: number) => void;
}

function EmployeeCard({ employee, onDelete }: EmployeeCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/employees/${employee.id}`);
  };

  return (
    <div className="employee-card">
      <img
        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
          employee.name
        )}&size=100`}
        alt={employee.name}
      />

      <h2>{employee.name}</h2>
      <p>EmpID: {employee.id}</p>
      <p>{employee.designation}</p>
      <p>{employee.department}</p>
      <p>{employee.status}</p>

      <div className="card-buttons">
        <button onClick={handleViewDetails}>View Details</button>
        <button onClick={() => onDelete(employee.id)}>Delete</button>
      </div>
    </div>
  );
}

export default EmployeeCard;
