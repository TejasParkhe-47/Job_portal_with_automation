import React from "react";

const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Software Development",
      description:
        "Innovative software development services to build, maintain, and upgrade applications, ensuring they meet the highest quality standards.",
    },
    {
      id: 2,
      service: "Web Development",
      description:
        "Comprehensive web development solutions from front-end design to back-end integration, delivering responsive and user-friendly websites.",
    },
    {
      id: 3,
      service: "Data Science",
      description:
        "Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.",
    },
    {
      id: 4,
      service: "Cloud Computing",
      description:
        "Reliable cloud computing services to manage, store, and process data efficiently, offering scalable and flexible cloud solutions.",
    },
    {
      id: 5,
      service: "DevOps",
      description:
        "DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market.",
    },
    {
      id: 6,
      service: "Mobile App Development",
      description:
        "Expert mobile app development for iOS and Android platforms, creating intuitive and engaging mobile experiences for your users.",
    },
  ];

  return (
    <section className="w-full px-6 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h3 className="text-4xl font-bold text-gray-900 mb-10 relative inline-block transition-all duration-300   px-6 py-2 rounded-lg">
          Top Niches
          <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-600 transition-all duration-300 scale-x-0 group-hover:scale-x-100"></span>
        </h3>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((element) => (
          <div
            key={element.id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-blue-50"
          >
            <h4 className="text-xl font-semibold text-gray-900 mb-3 transition-all duration-300 hover:text-blue-600">
              {element.service}
            </h4>
            <p className="text-gray-700 text-base transition-all duration-300 hover:text-gray-900">
              {element.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopNiches;