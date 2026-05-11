import { Link } from "react-router-dom";
// import DataTable from "react-data-table-component";
// import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DepartmentsTable from "./DepartmentsTable";
import Pagination from "./Pagination";
import paginate from "../../utils/Paginate";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);

  // ---  PAGINATION STATES  ---
  const [index, setIndex] = useState(0);
  const pages = paginate(filteredDepartments); //[Array(3), Array(3), Array(3), Array(3), Array(1)]
  // console.log("PAGES:", pages.length);

  const onDepartmentDelete = (id) => {
    const data = departments.filter((dep) => dep._id !== id);
    setDepartments(data);
    setFilteredDepartments((prev) => prev.filter((dep) => dep._id !== id));
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/department`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        //console.log("RESPONSE:", response);
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++,
            dep_name: dep.dep_name,
          }));
          setDepartments(data);
          setFilteredDepartments(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredDepartments(records);
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

  return (
    <>
      {depLoading ? (
        <div>Loading....</div>
      ) : (
        <div className="p-6 ">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Dep Name"
              className="border px-2 rounded-md py-0 5 border-gray-300"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Department
            </Link>
          </div>
          <div>
            <DepartmentsTable
              // departments={filteredDepartments}
              departments={pages[index]}
              onDepartmentDelete={onDepartmentDelete}
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
export default DepartmentList;
