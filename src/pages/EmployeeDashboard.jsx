import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";

const EmployeeDashboard = () => {
  return (
    <div className="flex gap-5">
      <EmployeeSidebar />
      <div className="bg-gray-100 flex-1 ml-64 h-screen flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
export default EmployeeDashboard;
