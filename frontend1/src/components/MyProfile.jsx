import React from "react";
import { useSelector } from "react-redux";

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-xl border border-gray-200">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h3>

      <div className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            disabled
            value={user && user.name}
            onChange={(e) => e.target.value}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email Address</label>
          <input
            type="email"
            disabled
            value={user && user.email}
            onChange={(e) => e.target.value}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
          />
        </div>

        {user && user.role === "Job Seeker" && (
          <div>
            <label className="block text-gray-700 font-medium mb-1">My Preferred Job Niches</label>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                disabled
                value={user && user.niches.firstNiche}
                onChange={(e) => e.target.value}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
              <input
                type="text"
                disabled
                value={user && user.niches.secondNiche}
                onChange={(e) => e.target.value}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
              <input
                type="text"
                disabled
                value={user && user.niches.thirdNiche}
                onChange={(e) => e.target.value}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="number"
            disabled
            value={user && user.phone}
            onChange={(e) => e.target.value}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Address</label>
          <input
            type="text"
            disabled
            value={user && user.address}
            onChange={(e) => e.target.value}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Role</label>
          <input
            type="text"
            disabled
            value={user && user.role}
            onChange={(e) => e.target.value}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Joined On</label>
          <input
            type="text"
            disabled
            value={user && user.createdAt}
            onChange={(e) => e.target.value}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
