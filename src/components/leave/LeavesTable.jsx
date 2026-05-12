import axios from "axios";
import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { LeaveButtons } from "../../utils/LeaveHelper";
import paginate from "../../utils/Paginate";
import Pagination from "../department/Pagination";

const LeavesTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  // ---  PAGINATION STATES  ---
  const [index, setIndex] = useState(0);
  const pages = paginate(filteredLeaves); //[Array(3), Array(3), Array(3), Array(3), Array(1)]
  console.log("PAGES:", pages.length);

  useEffect(() => {
    let isMounted = true;
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/leave`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (isMounted && response.data.success) {
          const data = response.data.leaves;
          setLeaves(data);
          setFilteredLeaves(data);
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
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase()),
    );
    setFilteredLeaves(data);
  };
  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase()),
    );
    setFilteredLeaves(data);
    setIndex(0);
  };

  const calculateDays = (start, end) => {
    const diffTime = new Date(end) - new Date(start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Pagination Button Functions
  const nextPage = () => {
    setIndex((prev) => {
      console.log("PREV:", prev);
      if (prev >= pages.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };
  const prevPage = () => {
    setIndex((prev) => {
      console.log("PREV:", prev);
      if (prev <= 0) {
        return pages.length - 1;
      } else {
        return prev - 1;
      }
    });
  };

  console.log(leaves);
  return (
    <div className="overflow-x-auto p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center mt-2">
        <input
          type="text"
          placeholder="Search By Dep Name"
          className="border px-2 rounded-md py-0 5 border-gray-300"
          onChange={filterByInput}
        />
        {/* <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Leave
        </Link> */}
        <div>
          <button
            className="ml-1 px-4 py-1 bg-gray-500 rounded text-white cursor-pointer"
            onClick={() => setFilteredLeaves(leaves)}
          >
            All
          </button>
          <button
            className="ml-1 px-4 py-1 bg-teal-600 rounded text-white cursor-pointer"
            onClick={() => filterByButton("Pending")}
          >
            Pending
          </button>
          <button
            className="ml-1 px-4 py-1 bg-teal-600 rounded text-white cursor-pointer"
            onClick={() => filterByButton("Approved")}
          >
            Approved
          </button>
          <button
            className="ml-1 px-4 py-1 bg-teal-600 rounded text-white cursor-pointer"
            onClick={() => filterByButton("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      {leaves.length > 0 ? (
        <>
          <div className="mt-6 overflow-x-auto shadow-sm rounded-lg border border-gray-100">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-600 uppercase bg-white border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">S No</th>
                  <th className="px-6 py-4 font-semibold">Emp ID</th>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Leave Type</th>
                  <th className="px-6 py-4 font-semibold">Department</th>
                  <th className="px-6 py-4 font-semibold">Days</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Actions
                  </th>

                  {/* <th className="px-6 py-4 font-semibold">Applied Date</th> */}
                </tr>
              </thead>
              <tbody>
                {pages[index]?.map((leave, index) => (
                  <tr
                    key={leave._id}
                    className="bg-white border-b border-gray-50 last:border-none hover:bg-slate-50/30 transition-colors"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {leave.employeeId.employeeId}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {leave.employeeId.userId.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {leave.leaveType}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {leave.employeeId.department.dep_name}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {calculateDays(leave.startDate, leave.endDate)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {leave.status}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-2">
                        <LeaveButtons id={leave._id} />
                      </div>
                    </td>
                    {/* <td className="px-6 py-4 font-medium text-gray-800">
                    {new Date(leave.appliedAt).toLocaleDateString()}
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {pages.length > 1 ? (
            <Pagination
              pages={pages}
              index={index}
              setIndex={setIndex}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          ) : null}
        </>
      ) : (
        <div>No Records</div>
      )}
    </div>
  );
};
export default LeavesTable;
