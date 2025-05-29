import { FaBriefcase, FaRobot, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1 
          className="text-4xl font-bold text-gray-900 mb-6 relative inline-block transition-all duration-300 px-6 py-2 rounded-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Us
          <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-600 transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-700 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to <strong className="text-blue-600">NextHire</strong>, your AI-powered job portal designed to simplify hiring and job searching. We leverage automation to provide seamless connections between job seekers and employers.
        </motion.p>
      </div>
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 text-center transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:-translate-y-3 hover:bg-blue-50"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          <FaBriefcase className="text-5xl text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2 transition-all duration-300 hover:text-blue-600">For Job Seekers</h2>
          <p className="text-gray-700 transition-all duration-300 hover:text-gray-900">Find your dream job effortlessly with our AI-driven recommendations and automated resume screening.</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 text-center transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:-translate-y-3 hover:bg-blue-50"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
        >
          <FaRobot className="text-5xl text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2 transition-all duration-300 hover:text-blue-600">AI Automation</h2>
          <p className="text-gray-700 transition-all duration-300 hover:text-gray-900">Our intelligent matching system connects job seekers and recruiters based on skills, experience, and industry trends.</p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 text-center transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:-translate-y-3 hover:bg-blue-50"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.4 }}
        >
          <FaUsers className="text-5xl text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2 transition-all duration-300 hover:text-blue-600">For Employers</h2>
          <p className="text-gray-700 transition-all duration-300 hover:text-gray-900">Post jobs, screen candidates, and schedule interviews effortlessly with our automated hiring tools.</p>
        </motion.div>
      </div>
      
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-2xl font-semibold mb-2 transition-all duration-300 hover:text-blue-600">Why Choose Us?</h2>
        <p className="text-gray-700 max-w-xl mx-auto transition-all duration-300 hover:text-gray-900">We streamline job searches and hiring through AI-powered automation, ensuring efficiency, accuracy, and better career opportunities.</p>
      </motion.div>
    </section>
  );
}