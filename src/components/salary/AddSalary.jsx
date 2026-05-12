import { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
//import { useNavigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddSalary = () => {
  const [salary, setSalary] = useState({
    employeeId: "",
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: "",
  });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  //const [departmentId, setDepartmentId] = useState("");
  //   const [empLoading, setEmpLoading] = useState(false);
  //const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const fetchedDeps = await fetchDepartments();
        setDepartments(fetchedDeps);
      } catch (error) {
        console.error("Fail to get data:", error);
      }
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    //setDepartmentId(e.target.value);
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  //   useEffect(() => {
  //     const fetchEmployee = async () => {
  //       setEmpLoading(true);
  //       try {
  //         const response = await axios.get(
  //           `${import.meta.env.VITE_API_URL}/employee/${id}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             },
  //           },
  //         );
  //         if (response.data.success) {
  //           const { employee } = response.data;
  //           setEmployee((prev) => ({
  //             ...prev,
  //             name: employee.userId.name,
  //             maritalStatus: employee.maritalStatus,
  //             designation: employee.designation,
  //             salary: employee.salary,
  //             department: employee.department._id,
  //           }));
  //         }
  //       } catch (error) {
  //         if (error.response && !error.response.data.success) {
  //           alert(error.response.data.error);
  //         }
  //       } finally {
  //         setEmpLoading(false);
  //       }
  //     };
  //     fetchEmployee();
  //   }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("💵SALARY:", salary);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token has expired. Please login again");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        alert("Unknown error during data submission.");
      }
      console.error("Submit Error:", error);
    }
  };

  // if (empLoading) {
  // return (
  //     <div className="flex justify-center items-center h-screen">
  //     <h2 className="text-xl font-semibold">Loading Employee Details...</h2>
  //     </div>
  // );
  // }

  // console.log("🏢DEPARTMENTS", departments);
  // console.log("👔EMPLOYEES", employees);
  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleDepartment}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Department</option>
                  {departments &&
                    departments.map((dep) => {
                      return (
                        <option key={dep._id} value={dep._id}>
                          {dep.dep_name}
                        </option>
                      );
                    })}
                </select>
              </div>
              {/* employee */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  name="employeeId"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Employee</option>
                  {departments &&
                    employees &&
                    employees.map((emp) => {
                      return (
                        <option key={emp._id} value={emp._id}>
                          {emp.employeeId}
                        </option>
                      );
                    })}
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  onChange={handleChange}
                  value={salary.basicSalary}
                  placeholder="Basic Salary"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* Allowance */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowance
                </label>
                <input
                  type="number"
                  name="allowances"
                  onChange={handleChange}
                  value={salary.allowances}
                  placeholder="allowance"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* Deduction */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  onChange={handleChange}
                  value={salary.deductions}
                  placeholder="Deductions"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              {/* pay date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  onChange={handleChange}
                  value={salary.payDate}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Salary
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};
export default AddSalary;
