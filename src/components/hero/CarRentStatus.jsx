import React, { useEffect, useState } from 'react';
import { FaQuoteLeft, FaCar, FaUserFriends, FaRegThumbsUp, FaTruck } from 'react-icons/fa';

const CarRentStatus = () => {
  const stats = [
    { value: 120, label: 'Cars Available Daily', icon: FaCar },
    { value: 3200, label: 'Satisfied Customers', icon: FaUserFriends },
    { value: 2800, label: '5-Star Reviews', icon: FaRegThumbsUp },
    { value: 150, label: 'Professional Drivers', icon: FaTruck },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const interval = 30;
    const steps = duration / interval;

    const counters = stats.map((stat, i) => {
      let current = 0;
      const increment = stat.value / steps;
      const timer = setInterval(() => {
        current += increment;
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[i] = Math.floor(current);
          return newCounts;
        });
        if (current >= stat.value) clearInterval(timer);
      }, interval);
      return timer;
    });

    return () => counters.forEach(clearInterval);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gray-900 text-white py-16 px-4 md:px-16 lg:px-32">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url("./car.jpg")' }}
      ></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white">Customer Feedback</h2>
          <div className="max-w-md">
            <FaQuoteLeft className="text-green-500 text-3xl mb-4" />
            <p className="text-gray-300 italic text-lg leading-relaxed">
              “I rented a car for a day, and the service was outstanding! The booking was fast, the car was clean, and the price was affordable. Highly recommend for daily rentals.”
            </p>
          </div>
          <div className="pt-4">
            <p className="text-xl font-semibold text-white">Dilshan Perera</p>
            <p className="text-sm text-gray-400">Regular Customer</p>
          </div>
          <div className="flex space-x-2 pt-2">
            <div className="w-8 h-1 bg-green-500 rounded"></div>
            <div className="w-8 h-1 bg-gray-600 rounded"></div>
            <div className="w-8 h-1 bg-gray-600 rounded"></div>
            <div className="w-8 h-1 bg-gray-600 rounded"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-xl hover:bg-opacity-90 transition duration-300 border border-gray-700 text-center"
            >
              <stat.icon className="text-green-500 text-3xl mb-2 mx-auto" />
              <p className="text-4xl font-bold text-white">
                {counts[index]} +
              </p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarRentStatus;
