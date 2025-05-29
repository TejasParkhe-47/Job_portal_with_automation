import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="text-center p-6">
    <h1 className="text-5xl font-bold text-gray-800 mb-4">404 Not Found</h1>
    <p className="text-gray-600 mb-8">
      Your Visited Page Not Found. You may go home page.
    </p>
    <Link
      to="/"
      className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition duration-200"
    >
      Back to home page
    </Link>
  </div>
</section>

  );
};

export default NotFound;
