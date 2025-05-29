import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { LuMoveRight } from "react-icons/lu";

import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  const handleComponentChange = (name) => {
    setComponentName(name);
    setShow(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  const renderComponent = () => {
    switch (componentName) {
      case "My Profile":
        return <MyProfile />;
      case "Update Profile":
        return <UpdateProfile />;
      case "Update Password":
        return <UpdatePassword />;
      case "Job Post":
        return <JobPost />;
      case "My Jobs":
        return <MyJobs />;
      case "Applications":
        return <Applications />;
      case "My Applications":
        return <MyApplications />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <section className="w-full min-h-screen bg-gray-50 p-4 mt-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600">
          Welcome! <span className="font-semibold">{user?.name}</span>
        </p>
      </div>

      <div className="flex gap-4">
        {/* Sidebar */}
        <div
          className={`flex-shrink-0 w-64 bg-white shadow-md rounded-lg transition-transform duration-300 ${
            show ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } md:block`}
        >
          <ul className="p-4 space-y-2">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Manage Account
            </h4>
            <li>
              <button
                onClick={() => handleComponentChange("My Profile")}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                My Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => handleComponentChange("Update Profile")}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Update Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => handleComponentChange("Update Password")}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
              >
                Update Password
              </button>
            </li>
            {user?.role === "Employer" && (
              <>
                <li>
                  <button
                    onClick={() => handleComponentChange("Job Post")}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                  >
                    Post New Job
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleComponentChange("My Jobs")}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                  >
                    My Jobs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleComponentChange("Applications")}
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                  >
                    Applications
                  </button>
                </li>
              </>
            )}
            {user?.role === "Job Seeker" && (
              <li>
                <button
                  onClick={() => handleComponentChange("My Applications")}
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
                >
                  My Applications
                </button>
              </li>
            )}
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Sidebar Toggle */}
          <div className="absolute top-0 left-0 md:hidden z-10">
            <button
              onClick={() => setShow(!show)}
              className="p-2 bg-white shadow rounded-md"
            >
              <LuMoveRight
                className={`transition-transform ${
                  show ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>
          {/* Rendered Component */}
          <div className="bg-white rounded-lg shadow p-4 min-h-[500px]">
            {renderComponent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
