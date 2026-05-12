import axios from "axios";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const limit = 7
  // const [limit, setLimit] = useState(7);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = useCallback(async () => {
    try {
      let queryParams = new URLSearchParams({
        limit,
        skip,
      }).toString();
      if (dateFilter) {
        queryParams += `&date=${dateFilter}`;
      }
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/attendance/report?${queryParams ? `${queryParams}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        // console.log(
        //    `${import.meta.env.VITE_API_URL}/api/attendance/report?${queryParams ? `${queryParams}` : ""}`,
        // );
        //console.log(response.data);
        setReport(response.data.groupedData);
        if (skip === 0) {
          setReport(response.data.groupedData);
        } else {
          setReport((prevReport) => ({
            ...prevReport,
            ...response.data.groupedData,
          }));
        }
      }
    } catch (error) {
      alert(
        error.message || "Failed to fetch attendance report. Please try again.",
      );
      console.error("Error fetching attendance report:", error);
    }
  }, [limit, skip, dateFilter]);

  useEffect(() => {
    let isMounted = true;
    const getInitialData = async () => {
      setLoading(true);
      await fetchReport();
      if (isMounted) setLoading(false);
    };
    getInitialData();
    return () => {
      isMounted = false;
    };
  }, [fetchReport, skip, dateFilter]);

  const handleLoadMore = () => {
    setSkip((prevSkip) => prevSkip + limit);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
    setSkip(0);
    setReport({});
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Attendance Report
      </h2>
      <div className="mb-6 flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Filter by Date
        </label>
        <input
          className="border border-gray-300 bg-gray-50 p-2 rounded-lg w-full max-w-xs focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          type="date"
          value={dateFilter}
          onChange={handleDateChange}
        />
      </div>
      {Object.entries(report).map(([date, records]) => (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <h2 className="px-4 py-4 text-sm font-semibold uppercase tracking-wider text-indigo-600 bg-white">
            Report for: <span className="text-gray-900 ml-1">{date}</span>
          </h2>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
              <tr>
                <th className="px-4 py-3 border-b">S No</th>
                <th className="px-4 py-3 border-b">Employee ID</th>
                <th className="px-4 py-3 border-b">Name</th>
                <th className="px-4 py-3 border-b">Department</th>
                <th className="px-4 py-3 border-b">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((record, idx) => (
                <tr
                  key={`${date}-${idx}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-gray-600">{idx + 1}</td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {record.employeeId}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {record.employeeName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {record.departmentName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        record.status === "present"
                          ? "bg-green-100 text-green-700"
                          : record.status === "absent"
                            ? "bg-red-100 text-red-700"
                            : record.status === "sick"
                              ? "bg-orange-100 text-orange-700"
                              : record.status === "leave"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <button
        className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 active:scale-95"
        onClick={handleLoadMore}
        disabled={!loading}
      >
        Load More
      </button>
    </div>
  );
};
export default AttendanceReport;
