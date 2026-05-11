import { DepartmentButtons } from "../../utils/DepartmentHelper";

// const DepartmentsTable = ({departments}) => {
//   return (
//     <div className="mt-6 overflow-x-auto">
//       <table className="w-full text-sm text-left text-gray-500">
//         <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
//           <tr>
//             <th className="px-6 py-3">S No</th>
//             <th className="px-6 py-3">Department Name</th>
//             <th className="px-6 py-3 text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {departments && departments.length > 0 ? (
//             departments.map((dep) => (
//               <tr key={dep._id} className="bg-white border-b hover:bg-gray-50">
//                 <td className="px-6 py-4">{dep.sno}</td>
//                 <td className="px-6 py-4">{dep.dep_name}</td>
//                 <td className="px-6 py-4 text-center">
//                   {/* Εδώ καλούμε το Component των κουμπιών περνώντας το ID */}
//                   <DepartmentButtons id={dep._id} />
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3" className="px-6 py-4 text-center">
//                 No departments found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

const DepartmentsTable = ({ departments, onDepartmentDelete }) => {
  return (
    <div className="mt-6 overflow-x-auto shadow-sm rounded-lg border border-gray-100">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-600 uppercase bg-white border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-semibold">S No</th>
            <th className="px-6 py-4 font-semibold">Department Name</th>
            <th className="px-6 py-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments && departments.length > 0 ? (
            departments.map((dep) => (
              <tr
                key={dep._id}
                className="bg-white border-b border-gray-50 last:border-none hover:bg-slate-50/30 transition-colors"
              >
                <td className="px-6 py-4">{dep.sno}</td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {dep.dep_name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-3">
                    <DepartmentButtons
                      id={dep._id}
                      onDepartmentDelete={onDepartmentDelete}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-10 text-center text-gray-400">
                No departments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentsTable;
