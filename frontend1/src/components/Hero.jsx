import React from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaMicrosoft, FaSlack } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)]"></div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-8 bg-blue-400/10 px-6 py-2 rounded-full border border-blue-400/30">
            <span className="text-sm font-semibold text-blue-400 tracking-wide">
              TRUSTED BY FORTUNE 500 COMPANIES
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your Career with
            <span className="block mt-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI-Driven Precision
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Advanced machine learning algorithms matching top talent with
            ideal opportunities in real-time across global markets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to="/login" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <button className="relative bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Start Your Journey
                <span className="ml-3 text-xl">→</span>
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl mb-16">
            {[
              { value: "50M+", label: "Opportunities Matched" },
              { value: "120+", label: "Countries Connected" }
            ].map((item, index) => (
              <div 
                key={index} 
                className="p-6 bg-white/5 backdrop-blur-sm border border-gray-800 rounded-xl hover:border-blue-400/30 transition-all duration-300 shadow-lg"
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">{item.value}</div>
                <div className="text-sm text-gray-400">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            {[
              { icon: <FaGoogle className="text-red-500 text-4xl" />, name: "Google" },
              { icon: <FaMicrosoft className="text-blue-500 text-4xl" />, name: "Microsoft" },
              { icon: <FaSlack className="text-purple-500 text-4xl" />, name: "Slack" }
              
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center hover:scale-110 transition-all duration-300">
                {item.icon}
                <span className="text-white mt-2 text-sm font-semibold">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
