import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaRegCalendarAlt,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center border-r border-r-gray-800 pr-2">
        <h3 className="text-2xl">Employee MS</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <FaBuilding />
          <span>Departments</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to={`/admin-dashboard/attendance`}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <FaRegCalendarAlt />
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to={`/admin-dashboard/attendance-report`}
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <AiOutlineFileText />
          <span>Attendance Report</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${isActive ? "bg-teal-500" : " "} flex items-center space-x-4 py-2.5 px-4 rounded`
          }
          end
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};
export default AdminSidebar;
