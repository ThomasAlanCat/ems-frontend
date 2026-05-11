import EmployeeButtons from "./EmployeeButtons";

const EmployeesTable = ({ employees }) => {

  return (
    <div className="mt-6 overflow-x-auto shadow-sm rounded-lg border border-gray-100">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-600 uppercase bg-white border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-semibold">S No</th>
            <th className="px-6 py-4 font-semibold">Image</th>
            <th className="px-6 py-4 font-semibold">Name</th>
            <th className="px-6 py-4 font-semibold">DOB</th>
            <th className="px-6 py-4 font-semibold">Department</th>
            <th className="px-6 py-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.length > 0 ? (
            employees.map((emp, index) => (
              <tr
                key={emp._id}
                className="bg-white border-b border-gray-50 last:border-none hover:bg-slate-50/30 transition-colors"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={emp.profileImage || "/default-avatar.png"}
                    alt={emp.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {emp.name}
                </td>
                <td className="px-6 py-4">
                  {new Date(emp.dob).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {emp.dep_name ? emp.dep_name : "N/A"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2">
                    <EmployeeButtons id={emp._id} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
