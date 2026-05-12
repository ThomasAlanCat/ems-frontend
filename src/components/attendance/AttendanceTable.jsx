import AttendanceTableButton from "./AttendanceTableButton";    

const AttendanceTable = ({ attendance, onAttendanceUpdate }) => {
  return (
    <div className="mt-6 overflow-x-auto shadow-sm rounded-lg border border-gray-100">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-600 uppercase bg-white border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-semibold">S No</th>
            <th className="px-6 py-4 font-semibold">Name</th>
            <th className="px-6 py-4 font-semibold">Department</th>
            <th className="px-6 py-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendance && attendance.length > 0 ? (
            attendance.map((att, index) => (
              <tr
                key={att.employeeId}
                className="bg-white border-b border-gray-50 last:border-none hover:bg-slate-50/30 transition-colors"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {att.name}
                </td>
                <td className="px-6 py-4">{att.department}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2">
                    <AttendanceTableButton attItem={att} onAttendanceUpdate={onAttendanceUpdate} />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                No attendance records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
