import { useNavigate } from "react-router-dom";
//import axios from "axios";

export const EmployeeButtons = ({ id }) => {
  const navigate = useNavigate();


  return (
    <div className="flex items-center gap-2">
      {/* View Button */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
        onClick={() => navigate(`/admin-dashboard/employees/${id}`)}
      >
        View
      </button>

      {/* Edit Button */}
      <button
        className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-xs transition-colors"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${id}`)}
      >
        Edit
      </button>

      {/* Salary Button */}
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition-colors"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${id}`)}
      >
        Salary
      </button>

      {/* Leave Button */}
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs transition-colors"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${id}`)}
      >
        Leave
      </button>
    </div>
  );
};

export default EmployeeButtons;
