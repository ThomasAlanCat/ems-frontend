import { useNavigate } from "react-router-dom";
import axios from "axios";

export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          onDepartmentDelete(id);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        className="bg-teal-500 text-white px-2 py-1 rounded cursor-pointer"
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};