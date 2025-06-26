import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <footer className="bg-gray-500 text-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <img src="../job-portal.png" alt="logo" className="w-32 mb-4" />
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-xl font-bold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>N-2 cidco</li>
              <li>Chhtrapathi Sambhajinagar, Maharashtra , India</li>
              <li>tejasparkhe43@gmail.com</li>
              <li>+91 7066777959</li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-xl font-bold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={"/"} className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to={"/jobs"} className="hover:text-blue-400 transition-colors">
                  Jobs
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to={"/dashboard"} className="hover:text-blue-400 transition-colors">
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h4 className="text-xl font-bold mb-3">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to={"#"} className="flex items-center hover:text-blue-400 transition-colors">
                  <span className="text-2xl mr-2">
                    <FaSquareXTwitter />
                  </span>
                  <span>Twitter (X)</span>
                </Link>
              </li>
              <li>
                <Link to={"#"} className="flex items-center hover:text-blue-400 transition-colors">
                  <span className="text-2xl mr-2">
                    <FaSquareInstagram />
                  </span>
                  <span>Instagram</span>
                </Link>
              </li>
              <li>
                <Link to={"#"} className="flex items-center hover:text-blue-400 transition-colors">
                  <span className="text-2xl mr-2">
                    <FaYoutube />
                  </span>
                  <span>Youtube</span>
                </Link>
              </li>
              <li>
                <Link to={"#"} className="flex items-center hover:text-blue-400 transition-colors">
                  <span className="text-2xl mr-2">
                    <FaLinkedin />
                  </span>
                  <span>LinkedIn</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="bg-gray-900 text-gray-400 text-center py-4">
        &copy; 2025. All Rights Reserved By Tejas Parkhe
      </div>
    </>
  );
};

export default Footer;
