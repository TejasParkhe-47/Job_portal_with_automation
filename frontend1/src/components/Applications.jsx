import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 className="text-center text-xl mt-10 text-gray-600">
          You have no applications from job seekers.
        </h1>
      ) : (
        <div className="px-4 py-8 max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Applications For Your Posted Jobs
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {applications.map((element) => (
              <div
                className="bg-white p-6 rounded-xl shadow border hover:shadow-md transition"
                key={element._id}
              >
                <p className="mb-2 text-gray-800">
                  <span className="font-semibold">Job Title:</span>{" "}
                  {element.jobInfo.jobTitle}
                </p>
                <p className="mb-2 text-gray-800">
                  <span className="font-semibold">Applicant's Name:</span>{" "}
                  {element.jobSeekerInfo.name}
                </p>
                <p className="mb-2 text-gray-800">
                  <span className="font-semibold">Email:</span>{" "}
                  {element.jobSeekerInfo.email}
                </p>
                <p className="mb-2 text-gray-800">
                  <span className="font-semibold">Phone:</span>{" "}
                  {element.jobSeekerInfo.phone}
                </p>
                <p className="mb-2 text-gray-800">
                  <span className="font-semibold">Address:</span>{" "}
                  {element.jobSeekerInfo.address}
                </p>
                <div className="mb-4">
                  <span className="font-semibold text-gray-800">
                    Cover Letter:
                  </span>
                  <textarea
                    className="w-full mt-1 p-2 border rounded text-gray-700"
                    value={element.jobSeekerInfo.coverLetter}
                    rows={5}
                    disabled
                  ></textarea>
                </div>
                <div className="flex justify-between mt-4 gap-4">
                  <button
                    onClick={() => handleDeleteApplication(element._id)}
                    className="flex-1 border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition"
                  >
                    Delete Application
                  </button>
                  <Link
                    to={
                      element.jobSeekerInfo &&
                      element.jobSeekerInfo.resume.url
                    }
                    target="_blank"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700 transition"
                  >
                    View Resume
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Applications;
