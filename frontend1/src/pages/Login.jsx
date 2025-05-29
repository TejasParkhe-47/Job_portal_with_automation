import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex">
      {/* Left Illustration / Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center">
        <div className="text-center px-12">
          {/* Replace with your logo or illustration */}
          <h1 className="text-4xl font-extrabold text-white mb-4">
           NextHire
          </h1>
          <p className="text-lg text-white/80">
            Empowering Employers & Job Seekers with seamless connections.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex flex-1 items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Sign In
          </h2>
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Login As
              </label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MdOutlineMailOutline className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <RiLock2Fill className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Logging In…" : "Log In"}
            </button>

            {/* Footer Links */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
