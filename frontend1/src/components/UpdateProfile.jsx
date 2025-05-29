import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearAllUpdateProfileErrors,
  updateProfile,
} from "../store/slices/updateProfileSlice";
import { toast } from "react-toastify";
import { getUser } from "../store/slices/userSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateProfile
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [coverLetter, setCoverLetter] = useState(user?.coverLetter || "");
  const [firstNiche, setFirstNiche] = useState(user?.niches?.firstNiche || "");
  const [secondNiche, setSecondNiche] = useState(user?.niches?.secondNiche || "");
  const [thirdNiche, setThirdNiche] = useState(user?.niches?.thirdNiche || "");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user?.resume?.url);

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    if (user?.role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
    }
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated.");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  }, [dispatch, loading, error, isUpdated, user]);

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
  };

  const nichesArray = [
    "Software Development", "Web Development", "Cybersecurity", "Data Science",
    "Artificial Intelligence", "Cloud Computing", "DevOps", "Mobile App Development",
    "Blockchain", "Database Administration", "Network Administration", "UI/UX Design",
    "Game Development", "IoT (Internet of Things)", "Big Data", "Machine Learning",
    "IT Project Management", "IT Support and Helpdesk", "Systems Administration", "IT Consulting"
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 bg-white rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h3>

      {[
        { label: "Full Name", type: "text", value: name, set: setName },
        { label: "Email Address", type: "email", value: email, set: setEmail },
        { label: "Phone Number", type: "number", value: phone, set: setPhone },
        { label: "Address", type: "text", value: address, set: setAddress }
      ].map((field, idx) => (
        <div className="mb-4" key={idx}>
          <label className="block mb-1 text-gray-700 font-medium">{field.label}</label>
          <input
            type={field.type}
            value={field.value}
            onChange={(e) => field.set(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      {user?.role === "Job Seeker" && (
        <>
          <div className="mb-5">
            <label className="block mb-1 text-gray-700 font-medium">Preferred Job Niches</label>
            <div className="flex flex-col gap-3">
              {[firstNiche, secondNiche, thirdNiche].map((niche, i) => (
                <select
                  key={i}
                  value={i === 0 ? firstNiche : i === 1 ? secondNiche : thirdNiche}
                  onChange={(e) =>
                    i === 0
                      ? setFirstNiche(e.target.value)
                      : i === 1
                      ? setSecondNiche(e.target.value)
                      : setThirdNiche(e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {nichesArray.map((element, index) => (
                    <option key={index} value={element}>
                      {element}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-1 text-gray-700 font-medium">Cover Letter</label>
            <textarea
              rows={5}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-1 text-gray-700 font-medium">Upload Resume</label>
            <input
              type="file"
              onChange={resumeHandler}
              className="block w-full mt-1"
            />
            {resumePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Current Resume:</p>
                <Link
                  to={resumePreview}
                  target="_blank"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View Resume
                </Link>
              </div>
            )}
          </div>
        </>
      )}

      <div className="text-right mt-6">
        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
