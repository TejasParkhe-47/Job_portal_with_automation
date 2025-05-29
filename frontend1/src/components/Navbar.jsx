import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full h-16 z-50 border-b-2 border-pink-600">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
       
        <div className="flex items-center space-x-3">
          <img src="../vite.svg" alt="logo" className="h-10 w-10" />
          <h1 className="text-xl font-semibold text-gray-900">NextHire</h1>
        </div>

        
        <div className="hidden md:flex space-x-6">
          <NavItem to="/" label="Home" />
          <NavItem to="/jobs" label="Jobs" />
          {isAuthenticated ? (
            <NavItem to="/dashboard" label="Dashboard" />
          ) : (
            <NavItem to="/login" label="Login" />
          )}
        </div>

        
        <div className="md:hidden">
          <button
            onClick={() => setShow(!show)}
            className="text-2xl p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            {show ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      
      {show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShow(false)}
        ></div>
      )}

      
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform ${
          show ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="p-6 flex flex-col space-y-4">
          <NavItem to="/" label="Home" onClick={() => setShow(false)} />
          <NavItem to="/jobs" label="Jobs" onClick={() => setShow(false)} />
          {isAuthenticated ? (
            <NavItem to="/dashboard" label="Dashboard" onClick={() => setShow(false)} />
          ) : (
            <NavItem to="/login" label="Login" onClick={() => setShow(false)} />
          )}
        </div>
      </div>
    </nav>
  );
};


const NavItem = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-gray-800 hover:text-blue-600 font-medium transition-all duration-200"
  >
    {label}
  </Link>
);

export default Navbar;

