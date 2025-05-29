import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
    <section className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-4xl font-bold text-gray-900 mb-10 relative inline-block transition-all duration-300  px-6 py-2 rounded-lg">
          How does it work?
          <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-600 transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
        </h3>
      </div>
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transform hover:-translate-y-2 hover:bg-blue-50 transition-all duration-300">
          <div className="flex justify-center mb-4">
            <LuUserPlus className="text-4xl text-blue-600" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center transition-all duration-300 hover:text-blue-600">
            Create an Account
          </h4>
          <p className="text-gray-700 text-base transition-all duration-300 hover:text-gray-900">
            Sign up for a free account as a job seeker or employer. Set up your
            profile in minutes to start posting jobs or applying for jobs.
            Customize your profile to highlight your skills or requirements.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transform hover:-translate-y-2 hover:bg-blue-50 transition-all duration-300">
          <div className="flex justify-center mb-4">
            <VscTasklist className="text-4xl text-green-600" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center transition-all duration-300 hover:text-blue-600">
            Post or Browse Jobs
          </h4>
          <p className="text-gray-700 text-base transition-all duration-300 hover:text-gray-900">
            Employers can post detailed job descriptions, and job seekers can
            browse a comprehensive list of available positions. Utilize filters
            to find jobs that match your skills and preferences.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transform hover:-translate-y-2 hover:bg-blue-50 transition-all duration-300">
          <div className="flex justify-center mb-4">
            <BiSolidLike className="text-4xl text-purple-600" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2 text-center transition-all duration-300 hover:text-blue-600">
            Hire or Get Hired
          </h4>
          <p className="text-gray-700 text-base transition-all duration-300 hover:text-gray-900">
            Employers can shortlist candidates and extend job offers. Job
            seekers can review job offers and accept positions that align with
            their career goals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;