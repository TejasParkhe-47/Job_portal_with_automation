import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllUserErrors, register } from "../store/slices/userSlice";
import { toast } from "react-toastify";
import { FaRegUser, FaPencilAlt, FaAddressBook } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineMailOutline, MdCategory } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstNiche, setFirstNiche] = useState("");
  const [secondNiche, setSecondNiche] = useState("");
  const [thirdNiche, setThirdNiche] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);

  const nichesArray = [
    "Software Development", "Web Development", "Cybersecurity",
    "Data Science", "AI", "Cloud Computing", "DevOps",
    "Mobile App Development", "Blockchain", "UI/UX Design",
    // …others
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if(isAuthenticated){
      navigate("/login");
    }
      
    
  }, [dispatch, error,isAuthenticated,  navigate]);

  const resumeHandler = (e) => { setResume(e.target.files[0]); };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("role", role);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if (role === "Job Seeker") {
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
      console.log(resume)
    }
    dispatch(register(formData));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center">
        <div className="text-center px-12">
          <h1 className="text-4xl font-extrabold text-white mb-4">NextHire</h1>
          <p className="text-lg text-white/80">Join us and start connecting today.</p>
        </div>
      </div>

      {/* Form Panel */}
      <div className="flex flex-1 items-center justify-center p-6 bg-gray-50 mt-11">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create an Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Register As
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

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaPencilAlt className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
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

            {/* Phone & Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="111‑222‑333"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaPhoneFlip className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <FaAddressBook className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                </div>
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

            
            {role === "Job Seeker" && (
              <>
                <div className="space-y-5">
                  {[firstNiche, secondNiche, thirdNiche].map((val, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {`Your ${["First","Second","Third"][idx]} Niche`}
                      </label>
                      <div className="relative">
                        <select
                          value={val}
                          onChange={(e) => {
                            [setFirstNiche, setSecondNiche, setThirdNiche][idx](e.target.value);
                          }}
                          required
                          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Your Niche</option>
                          {nichesArray.map((n, i) => (
                            <option key={i} value={n}>{n}</option>
                          ))}
                        </select>
                        <MdCategory className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Letter
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your cover letter…"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Resume
                  </label>
                  <input
                    type="file"
                    onChange={resumeHandler}
                    required
                    className="w-full text-gray-700"
                  />
                </div>
              </>
            )}

            {/* Submit & Link */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Registering…" : "Register"}
            </button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
