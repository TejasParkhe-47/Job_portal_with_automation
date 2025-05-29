import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );

  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user]);

  let qualifications = [];
  let responsibilities = [];
  let offering = [];
  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(". ");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(". ");
  }
  if (singleJob.offers) {
    offering = singleJob.offers.split(". ");
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  return (  
    <div className="max-w-5xl mx-auto p-4 mt-16">
      <article className="flex flex-col gap-10 md:flex-row">
        {/* Form Section */}
        <form className="w-full md:w-1/2 bg-white shadow-md rounded-xl p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Application Form</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              placeholder={singleJob.title}
              disabled
              className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md"
            />
          </div>
          {user && user.role === "Job Seeker" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={6}
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Resume</label>
                <input
                  type="file"
                  onChange={resumeHandler}
                  className="mt-1"
                />
              </div>
            </>
          )}
          {isAuthenticated && user.role === "Job Seeker" && (
            <div className="flex justify-end">
              <button
                onClick={handlePostApplication}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                Apply
              </button>
            </div>
          )}
        </form>

        {/* Job Details Section */}
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-xl p-6 space-y-4">
          <header>
            <h3 className="text-xl font-semibold">{singleJob.title}</h3>
            {singleJob.personalWebsite && (
              <Link
                target="_blank"
                to={singleJob.personalWebsite.url}
                className="text-blue-500 hover:underline block"
              >
                {singleJob.personalWebsite.title}
              </Link>
            )}
            <p className="text-sm text-gray-600">{singleJob.location}</p>
            <p className="text-sm text-gray-600">Rs. {singleJob.salary} a month</p>
          </header>
          <hr />
          <section>
            <div>
              <h3 className="font-semibold text-lg mb-2">Job Details</h3>
              <div className="flex items-start gap-3 mb-2">
                <IoMdCash className="text-xl" />
                <div>
                  <p className="font-medium">Pay</p>
                  <p className="text-sm text-gray-600">{singleJob.salary} a month</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaToolbox className="text-xl" />
                <div>
                  <p className="font-medium">Job Type</p>
                  <p className="text-sm text-gray-600">{singleJob.jobType}</p>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Location</h3>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FaLocationDot className="text-lg" />
                <span>{singleJob.location}</span>
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Full Job Description</h3>
              <p className="text-sm mb-4">{singleJob.introduction}</p>
              {singleJob.qualifications && (
                <div>
                  <h4 className="font-semibold">Qualifications</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {qualifications.map((el) => (
                      <li key={el}>{el}</li>
                    ))}
                  </ul>
                </div>
              )}
              {singleJob.responsibilities && (
                <div>
                  <h4 className="font-semibold mt-4">Responsibilities</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {responsibilities.map((el) => (
                      <li key={el}>{el}</li>
                    ))}
                  </ul>
                </div>
              )}
              {singleJob.offers && (
                <div>
                  <h4 className="font-semibold mt-4">Offering</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {offering.map((el) => (
                      <li key={el}>{el}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
          <hr />
          <footer>
            <h3 className="font-semibold text-lg">Job Niche</h3>
            <p className="text-sm text-gray-600">{singleJob.jobNiche}</p>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default PostApplication;
