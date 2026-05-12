import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeesTable from "./EmployeesTable";
import paginate from "../../utils/Paginate";
import Pagination from "../department/Pagination";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);

  // ---  PAGINATION STATES  ---
  const [index, setIndex] = useState(0);
  const pages = paginate(filteredEmployees); //[Array(3), Array(3), Array(3), Array(3), Array(1)]
  console.log("PAGES:", pages.length);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/employee`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          console.log("RESPONSE:", response.data.employees);
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            // dob: emp.dob,
            dob: new Date(emp.dob).toDateString(),
            profileImage: `${import.meta.env.VITE_API_URL}/${emp.userId.profileImage}`,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filterEmployees = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredEmployees(records);
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
    console.log("State has changed:", employees);
  }, [employees]);

  return (
    <>
      {empLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Employees</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Dep Name"
              className="border px-2 rounded-md py-0 5 border-gray-300"
              onChange={filterEmployees}
            />
            <Link
              to="/admin-dashboard/add-employee"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Employee
            </Link>
          </div>
          <div>
            <EmployeesTable employees={pages[index] || []} />
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
export default EmployeeList;
