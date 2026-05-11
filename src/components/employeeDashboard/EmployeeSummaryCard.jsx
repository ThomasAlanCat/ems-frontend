import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/ΑuthContext";

const EmployeeSummaryCard = () => {
  const { user } = useAuth();
  return (
    <div className="rounded flex bg-white shadow-md m-6">
      <div
        className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4 rounded-l`}
      >
        <FaUser />
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">Welcome Back</p>
        <p className="text-xl font-bold">{user.name}</p>
      </div>
    </div>
  );
};
export default EmployeeSummaryCard;
