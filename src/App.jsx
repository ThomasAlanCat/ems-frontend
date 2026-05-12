import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import AddSalary from "./components/salary/AddSalary";
import { ViewSalary } from "./components/salary/ViewSalary";
import EmployeeSummary from "./components/employeeDashboard/EmployeeSummaryCard";
import LeavesList from "./components/leave/LeavesList";
import AddLeave from "./components/leave/AddLeave";
import Setting from "./components/employeeDashboard/Setting";
import LeavesTable from "./components/leave/LeavesTable";
import LeaveDetail from "./components/leave/LeaveDetail";
import Attendance from "./components/attendance/Attendance";
import AttendanceReport from "./components/attendance/AttendanceReport";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }
      >
        <Route index element={<AdminSummary />} />
        <Route
          path="/admin-dashboard/departments"
          element={<DepartmentList />}
        />
        <Route
          //
          path="/admin-dashboard/add-department"
          element={<AddDepartment />}
        />
        <Route
          path="/admin-dashboard/department/:id"
          element={<EditDepartment />}
        />
        <Route path="/admin-dashboard/employees" element={<List />} />
        <Route path="/admin-dashboard/add-employee" element={<AddEmployee />} />
        <Route path="/admin-dashboard/employees/:id" element={<View />} />
        <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />} />
        <Route
          path="/admin-dashboard/employees/salary/:id"
          element={<ViewSalary />}
        />
        <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />
        <Route path="/admin-dashboard/leaves" element={<LeavesTable />} />
        <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetail />} />
        <Route
          path="/admin-dashboard/employees/leaves/:id"
          element={<LeavesList />}
        />
        <Route path="/admin-dashboard/setting" element={<Setting />} />
        <Route path="/admin-dashboard/attendance" element={<Attendance />} />
        <Route
          path="/admin-dashboard/attendance-report"
          element={<AttendanceReport />}
        />
      </Route>
      <Route
        path="/employee-dashboard"
        element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
        }
      >
        <Route index element={<EmployeeSummary />} />
        <Route path="/employee-dashboard/profile/:id" element={<View />} />
        <Route path="/employee-dashboard/leaves/:id" element={<LeavesList />} />
        <Route path="/employee-dashboard/add-leave" element={<AddLeave />} />
        <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />} />
        <Route path="/employee-dashboard/settings" element={<Setting />} />
      </Route>
    </Routes>
  );
};
export default App;
