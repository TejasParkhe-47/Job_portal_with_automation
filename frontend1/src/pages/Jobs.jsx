import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };
  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

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
  

  const nichesArray = [
    "All",
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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs bg-gray-50 min-h-screen py-8">
          {/* Adding mt-16 to push the search bar below the navbar */}
          <div className="search-tab-wrapper mt-16 mx-auto max-w-4xl px-4 mb-8 flex items-center">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search jobs..."
              className="flex-grow border border-gray-300 rounded-l-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 transition duration-200"
            >
              Find Job
            </button>
            <FaSearch className="ml-2 text-gray-600" />
          </div>
          <div className="wrapper mx-auto max-w-6xl px-4">
            <div className="filter-bar grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="cities bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold mb-4">Filter Job By City</h2>
                {cities.map((city, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={city}
                      name="city"
                      value={city}
                      checked={selectedCity === city}
                      onChange={() => handleCityChange(city)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={city} className="ml-2 text-gray-700">
                      {city}
                    </label>
                  </div>
                ))}
              </div>
              <div className="cities bg-white shadow rounded p-4">
                <h2 className="text-xl font-semibold mb-4">Filter Job By Niche</h2>
                {nichesArray.map((niche, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={niche}
                      name="niche"
                      value={niche}
                      checked={selectedNiche === niche}
                      onChange={() => handleNicheChange(niche)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={niche} className="ml-2 text-gray-700">
                      {niche}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter mb-6 flex flex-col sm:flex-row gap-4">
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Filter By City</option>
                  {cities.map((city, index) => (
                    <option value={city} key={index}>
                      {city}
                    </option>
                  ))}
                </select>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Filter By Niche</option>
                  {nichesArray.map((niche, index) => (
                    <option value={niche} key={index}>
                      {niche}
                    </option>
                  ))}
                </select>
              </div>
              <div className="jobs_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs && jobs.length > 0 ? (
                  jobs.map((element) => (
                    <div key={element._id} className="card bg-white shadow-md rounded p-6 flex flex-col">
                      {element.hiringMultipleCandidates === "Yes" ? (
                        <p className="hiring-multiple text-sm text-green-600 font-medium mb-2">
                          Hiring Multiple Candidates
                        </p>
                      ) : (
                        <p className="hiring text-sm text-blue-600 font-medium mb-2">
                          Hiring
                        </p>
                      )}
                      <p className="title text-lg font-bold mb-1">{element.title}</p>
                      <p className="company text-md text-gray-800 mb-1">{element.companyName}</p>
                      <p className="location text-md text-gray-600 mb-1">{element.location}</p>
                      <p className="salary text-md text-gray-600 mb-1">
                        <span className="font-semibold">Salary:</span> Rs. {element.salary}
                      </p>
                      <p className="posted text-sm text-gray-500 mb-4">
                        <span className="font-semibold">Posted On:</span>{" "}
                        {element.jobPostedOn.substring(0, 10)}
                      </p>
                      <div className="btn-wrapper mt-auto">
                        <Link
                          className="btn inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                          to={`/post/application/${element._id}`}
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  /* BUG No.2 */
                  <img src="./notfound.png" alt="job-not-found" className="w-full" />
                  /* BUG No.2 */
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
