import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      window.location.href = "/";
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-blue-700 text-center mb-2">Login</h2>
        <p className="text-center text-gray-500 mb-4">Welcome back! Please login to your account.</p>
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition">
          Login
        </button>
        <div className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </div>
        {/* Demo credentials */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <div className="font-semibold mb-1">Demo Accounts (use for login):</div>
          <div>
            <span className="font-medium">Email:</span> krushna@gmail.com<br />
            <span className="font-medium">Password:</span> 123456
          </div>
          <div className="mt-2">
            <span className="font-medium">Email:</span> abc@gmail.com<br />
            <span className="font-medium">Password:</span> 123
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;