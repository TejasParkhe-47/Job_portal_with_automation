import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : myJobs && myJobs.length <= 0 ? (
        <h1 className="text-xl font-semibold text-center mt-8">
          You have not posted any job!
        </h1>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">My Jobs</h3>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {myJobs.map((element) => (
              <div
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
                key={element._id}
              >
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Job Title: </span>
                  {element.title}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Job Niche: </span>
                  {element.jobNiche}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Salary: </span>
                  {element.salary}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Location: </span>
                  {element.location}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Job Type: </span>
                  {element.jobType}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Company Name: </span>
                  {element.companyName}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Introduction: </span>
                  {element.introduction}
                </p>
                <p className="mb-2 text-gray-700">
                  <span className="font-semibold">Qualifications: </span>
                  {element.qualifications}
                </p>
                <p className="mb-4 text-gray-700">
                  <span className="font-semibold">Responsibilities: </span>
                  {element.responsibilities}
                </p>
                {element.offers && (
                  <p className="mb-4 text-gray-700">
                    <span className="font-semibold">What Are We Offering: </span>
                    {element.offers}
                  </p>
                )}
                <button
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
                  onClick={() => handleDeleteJob(element._id)}
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyJobs;
