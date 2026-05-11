import { useState } from "react";
//import { useAuth } from "../../context/ΑuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Setting = () => {
  const navigate = useNavigate();
  //const { user } = useAuth();
  const [setting, setSetting] = useState({
    // userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(setting);
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password do not match");
    } else {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/setting/change-password`,
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          navigate(`/employee-dashboard`);
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-slate-50 flex items-center justify-center overflow-hidden">

      <div className="relative z-10 flex flex-col items-center space-y-6 w-full">


        <div className="shadow-2xl p-8 w-80 bg-white/90 backdrop-blur-sm rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-teal-900 text-center ">
            Change Password
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-teal-900"
              >
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Change Password"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-teal-900"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-teal-900"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="New Password"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition-colors shadow-lg cursor-pointer"
              // disabled={loading}
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Setting;
