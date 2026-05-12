import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import paginate from "../../utils/Paginate";
import Pagination from "../department/Pagination";
import AttendanceTable from "./AttendanceTable";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  // ---  PAGINATION STATES  ---
  const [index, setIndex] = useState(0);
  const pages = paginate(filteredAttendance); //[Array(3), Array(3), Array(3), Array(3), Array(1)]
  //console.log("PAGES:", pages.length);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendance`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      if (response.data.success) {
        let sno = 1;
        const data = response.data.attendance.map((att) => ({
          employeeId: att.employeeId.employeeId,
          sno: sno++,
          department: att.employeeId.department.dep_name,
          name: att.employeeId.userId.name,
          status: att.status,
        }));
        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const getInitialData = async () => {
      setLoading(true);
      await fetchAttendance();
      if (isMounted) setLoading(false);
    };

    getInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filterAttendance = (e) => {
    const records = attendance.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredAttendance(records);
    setIndex(0);
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

  useEffect(() => {
    console.log("State has changed:", attendance);
  }, [attendance]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center mt-4">
            <input
              type="text"
              placeholder="Search By Dep Name"
              className="border px-2 rounded-md py-0 5 border-gray-300"
              onChange={filterAttendance}
            />
            <p className="text-2xl">
              Mark Employees for{" "}
              <span className="text-2xl font-bold underline">
                {new Date().toISOString().split("T")[0]}
              </span>{" "}
            </p>
            <Link
              to="/admin-dashboard/attendance-report"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Attendance Report
            </Link>
          </div>
          <div>
            <AttendanceTable
              attendance={pages[index] || []}
              onAttendanceUpdate={fetchAttendance}
            />
          </div>
          <Pagination
            pages={pages}
            index={index}
            setIndex={setIndex}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        </div>
      )}
    </>
  );
};
export default Attendance;
