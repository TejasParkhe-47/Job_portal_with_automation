import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { CiCircleInfo } from "react-icons/ci";

const JobPost = () => {
  const [title, setTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [offers, setOffers] = useState("");
  const [jobNiche, setJobNiche] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("");
  const [personalWebsiteTitle, setPersonalWebsiteTitle] = useState("");
  const [personalWebsiteUrl, setPersonalWebsiteUrl] = useState("");

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const cities = [ 
    "All",
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Patna",
    "Vadodara",
  ];
  

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handlePostJob = (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("companyName", companyName);
    formData.append("introduction", introduction);
    formData.append("responsibilities", responsibilities);
    formData.append("qualifications", qualifications);
    offers && formData.append("offers", offers);
    formData.append("jobNiche", jobNiche);
    formData.append("salary", salary);
    hiringMultipleCandidates &&
      formData.append("hiringMultipleCandidates", hiringMultipleCandidates);
    personalWebsiteTitle &&
      formData.append("personalWebsiteTitle", personalWebsiteTitle);
    personalWebsiteUrl &&
      formData.append("personalWebsiteUrl", personalWebsiteUrl);

    dispatch(postJob(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-white rounded-lg shadow">
      <h3 className="text-2xl font-bold mb-6 text-center">Post A Job</h3>

      {/* Form Fields */}
      {[
        {
          label: "Title",
          type: "text",
          value: title,
          setValue: setTitle,
          placeholder: "Job Title",
        },
        {
          label: "Company Name",
          type: "text",
          value: companyName,
          setValue: setCompanyName,
          placeholder: "Company Name",
        },
        {
          label: "Salary",
          type: "text",
          value: salary,
          setValue: setSalary,
          placeholder: "50000 - 800000",
        },
        {
          label: "Personal Website Name",
          type: "text",
          value: personalWebsiteTitle,
          setValue: setPersonalWebsiteTitle,
          placeholder: "Personal Website Name/Title",
          optional: true,
        },
        {
          label: "Personal Website Link (URL)",
          type: "text",
          value: personalWebsiteUrl,
          setValue: setPersonalWebsiteUrl,
          placeholder: "Personal Website Link (URL)",
          optional: true,
        },
      ].map(({ label, type, value, setValue, placeholder, optional }) => (
        <div key={label} className="mb-4">
          <label className="block font-medium mb-1">
            {label}
            {optional && (
              <span className="text-sm text-gray-500 ml-2 inline-flex items-center">
                <CiCircleInfo className="inline mr-1" />
                Optional
              </span>
            )}
          </label>
          <input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      {/* Select Fields */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Job Type</label>
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Location (City)</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Select Location</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Job Niche</label>
        <select
          value={jobNiche}
          onChange={(e) => setJobNiche(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Select Job Niche</option>
          {nichesArray.map((niche) => (
            <option key={niche} value={niche}>{niche}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">
          Hiring Multiple Candidates?
          <span className="text-sm text-gray-500 ml-2 inline-flex items-center">
            <CiCircleInfo className="inline mr-1" />
            Optional
          </span>
        </label>
        <select
          value={hiringMultipleCandidates}
          onChange={(e) => setHiringMultipleCandidates(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Hiring Multiple Candidates?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* Textareas */}
      {[
        {
          label: "Company/Job Introduction",
          value: introduction,
          setValue: setIntroduction,
          placeholder: "Company / Job Introduction",
        },
        {
          label: "Responsibilities",
          value: responsibilities,
          setValue: setResponsibilities,
          placeholder: "Job Responsibilities",
        },
        {
          label: "Qualifications",
          value: qualifications,
          setValue: setQualifications,
          placeholder: "Required Qualifications For Job",
        },
        {
          label: "What We Offer",
          value: offers,
          setValue: setOffers,
          placeholder: "What are we offering in return!",
          optional: true,
        },
      ].map(({ label, value, setValue, placeholder, optional }) => (
        <div key={label} className="mb-4">
          <label className="block font-medium mb-1">
            {label}
            {optional && (
              <span className="text-sm text-gray-500 ml-2 inline-flex items-center">
                <CiCircleInfo className="inline mr-1" />
                Optional
              </span>
            )}
          </label>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}

      <div className="text-center">
        <button
          onClick={handlePostJob}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </div>
    </div>
  );
};

export default JobPost;
