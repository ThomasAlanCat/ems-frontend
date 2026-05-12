//import { useNavigate } from "react-router-dom";

import axios from "axios";

export const AttendanceTableButton = ({ attItem, onAttendanceUpdate }) => {
  // console.log(attItem);
  //const navigate = useNavigate();

  const markEmployee = async (status, employeeId) => {
    //console.log(status, employeeId);
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/attendance/update/${employeeId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.data.success) {
      alert("Attendance marked successfully!");
      onAttendanceUpdate(response.data.attendance);
      //navigate("/admin-dashboard/attendance");
    } else {
      alert("Failed to mark attendance. Please try again.");
    }
  };

  return (
    <div>
      {attItem.status === null ? (
        <div className="flex items-center gap-2">
          {/* Present Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
            onClick={() => markEmployee("present", attItem.employeeId)}
          >
            Present
          </button>

          {/* Absent Button */}
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded text-xs transition-colors"
            onClick={() => markEmployee("absent", attItem.employeeId)}
          >
            Absent
          </button>

          {/* Sick Button */}
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition-colors"
            onClick={() => markEmployee("sick", attItem.employeeId)}
          >
            Sick
          </button>

          {/* Leave Button */}
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs transition-colors"
            onClick={() => markEmployee("leave", attItem.employeeId)}
          >
            Leave
          </button>
        </div>
      ) : (
        <p>{attItem.status}</p>
      )}
    </div>
  );
};
export default AttendanceTableButton;
