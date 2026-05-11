import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/ΑuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
      );
      if (response.data.success) {
        setError("");
        alert("Successfully login");
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }
    } catch (error) {
      console.log(error.response);
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError("Server Error");
      }
    }
  };
  return (
    <div className="min-h-screen w-full relative bg-slate-50 flex items-center justify-center overflow-hidden">
      {/* 1. Background Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `

        radial-gradient(125% 125% at 50% 10%,#9bc5c3   20%, #616161  100%)
      `,
          backgroundSize: "100% 100%",
        }}
      />

      {/* 2. Content Layer */}
      <div className="relative z-10 flex flex-col items-center space-y-6 w-full">
        <h2 className="text-4xl text-teal-800 drop-shadow-md">
          Employee Management System
        </h2>

        <div className="shadow-2xl p-8 w-80 bg-white/90 backdrop-blur-sm rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-teal-900 text-center ">
            Login
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-teal-900"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-teal-900"
              >
                Password
              </label>
              <input
                type="password" // Διόρθωσα το type από email σε password
                placeholder="******"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6 flex items-center justify-between text-xs">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox text-teal-600"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-teal-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-semibold transition-colors shadow-lg cursor-pointer"
              disabled={loading}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
