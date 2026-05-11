import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
//import { useAuth } from "../context/ΑuthContext";

const AdminDashboard = () => {
 // const { user } = useAuth();

  return (
    <div className="flex gap-5">
      <AdminSidebar />
      <div className="bg-gray-100 flex-1 ml-64 h-screen flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
export default AdminDashboard;
