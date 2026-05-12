import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/ΑuthContext";

const LeavesList = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/leave/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        console.log(response);
        if (isMounted && response.data.success) {
          setLeaves(response.data.leaves);
        }
      } catch (error) {
        if (isMounted && error.response && !error.response.data.success) {
          alert(error.message);
        }
      }
    };
    fetchLeaves();

    return () => {
      isMounted = false; // Clean uo function
    };
  }, [user._id]);

  if (!leaves) {
    return <div>Loading...</div>;
  }

  //console.log(leaves);
  return (
    <div className="overflow-x-auto p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center">
        <div></div>
        {/* <input
          type="text"
          placeholder="Search By Dep Name"
          className="border px-2 rounded-md py-0 5 border-gray-300"
        /> */}
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Add New Leave
          </Link>
        )}
      </div>

      {leaves.length > 0 ? (
        <div className="mt-6 overflow-x-auto shadow-sm rounded-lg border border-gray-100">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-600 uppercase bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">S No</th>
                <th className="px-6 py-4 font-semibold">Leave Type</th>
                <th className="px-6 py-4 font-semibold">From</th>
                <th className="px-6 py-4 font-semibold">To</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                {/* <th className="px-6 py-4 font-semibold">Applied Date</th> */}
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className="bg-white border-b border-gray-50 last:border-none hover:bg-slate-50/30 transition-colors"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {leave.leaveType}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {leave.reason}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {leave.status}
                  </td>
                  {/* <td className="px-6 py-4 font-medium text-gray-800">
                    {new Date(leave.appliedAt).toLocaleDateString()}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No Records</div>
      )}
    </div>
  );
};
export default LeavesList;
