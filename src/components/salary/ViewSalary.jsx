import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ViewSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  //const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;
    const fetchSalaries = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/salary/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        console.log(response.data);
        if (isMounted && response.data.success) {
          setSalaries(response.data.salary);
          // setFilteredSalaries(response.data.salary);
        }
      } catch (error) {
        if (isMounted) {
          if (error.response && error.response.status === 404) {
            setSalaries([]);
          } else {
            alert("Error during fetching or loading: " + error.message);
          }
        }
      }
    };
    fetchSalaries();

    return () => {
      isMounted = false; // Clean uo function
    };
  }, [id]);

  //   const filterSalaries = (e) => {
  //     console.log(e.target.value)
  //     const filteredRecords = salaries.filter((leave) =>
  //       leave.employeeId.toLowerCase().includes(q.toLowerCase()),
  //     );
  //     setFilteredSalaries(filteredRecords);
  //   };

  const filteredSalaries = salaries
    ? salaries.filter((salary) =>
        salary.employeeId.employeeId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      )
    : null;

  console.log(salaries);
  return (
    <>
      {salaries === null ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>
          </div>
          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search By Emp ID"
              className="border px-2 rounded-md py-0 5 border-gray-300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <div className="mt-6 overflow-x-auto shadow-sm rounded-lg border border-gray-100">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-600 uppercase bg-white border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">S No</th>
                    <th className="px-6 py-4 font-semibold">Emp ID</th>
                    <th className="px-6 py-4 font-semibold">Salary</th>
                    <th className="px-6 py-4 font-semibold">Allowance</th>
                    <th className="px-6 py-4 font-semibold">Deduction</th>
                    <th className="px-6 py-4 font-semibold">Total</th>
                    <th className="px-6 py-4 font-semibold">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary, index) => (
                    <tr
                      key={salary._id}
                      className="bg-white border-b border-gray-50 last:border-none hover:bg-slate-50/30 transition-colors"
                    >
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {salary.employeeId.employeeId}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {salary.basicSalary}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {salary.allowances}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {salary.deductions}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {salary.netSalary}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>No Records</div>
          )}
        </div>
      )}
    </>
  );
};
