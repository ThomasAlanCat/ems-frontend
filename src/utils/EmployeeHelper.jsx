import axios from "axios";

export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/department`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return departments;
};

// employees for salary form
export const getEmployees = async (id) => {
  let employees;
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    // console.log("RESPONSE:", response.data);

    if (response.data.success) {
      employees = response.data.employees;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }

  return employees;
};
