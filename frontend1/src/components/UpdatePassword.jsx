import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updatePassword,
} from "../store/slices/updateProfileSlice";
import { getUser } from "../store/slices/userSlice";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();

  const handleUpdatePassword = () => {
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);
    dispatch(updatePassword(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Password Updated");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <div className="max-w-xl mx-auto px-6 py-8 bg-white border border-gray-200 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Update Password</h3>

      {[{
        label: "Current Password",
        value: oldPassword,
        setter: setOldPassword,
      }, {
        label: "New Password",
        value: newPassword,
        setter: setNewPassword,
      }, {
        label: "Confirm Password",
        value: confirmPassword,
        setter: setConfirmPassword,
      }].map((field, index) => (
        <div className="relative mb-5" key={index}>
          <label className="block mb-1 text-gray-700 font-medium">{field.label}</label>
          <input
            type={showPassword ? "text" : "password"}
            value={field.value}
            onChange={(e) => field.setter(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span
            className="absolute top-9 right-3 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaEye />}
          </span>
        </div>
      ))}

      <div className="text-right mt-6">
        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default UpdatePassword;
