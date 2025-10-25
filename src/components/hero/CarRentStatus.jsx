import { useEffect, useState, useRef } from "react";
import { FaCar, FaUserFriends, FaRegThumbsUp, FaTruck } from "react-icons/fa";

const CarRentStatus = () => {
  const stats = [
    { value: 120, label: "Cars Available Daily", icon: FaCar },
    { value: 3200, label: "Satisfied Customers", icon: FaUserFriends },
    { value: 2800, label: "5-Star Reviews", icon: FaRegThumbsUp },
    { value: 150, label: "Professional Drivers", icon: FaTruck },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.3 } 
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCount) return;

    const duration = 2000;
    const interval = 30;
    const steps = duration / interval;

    const counters = stats.map((stat, i) => {
      let current = 0;
      const increment = stat.value / steps;
      const timer = setInterval(() => {
        current += increment;
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[i] = Math.floor(current);
          return newCounts;
        });
        if (current >= stat.value) clearInterval(timer);
      }, interval);
      return timer;
    });

    return () => counters.forEach(clearInterval);
  }, [startCount]);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-900 text-white py-16 px-4 md:px-16 lg:px-32 section-animation"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: 'url("./car.jpg")' }}
      ></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-xl hover:bg-opacity-90 transition duration-300 border border-gray-700 text-center"
          >
            <stat.icon className="text-orange-500 text-3xl mb-2 mx-auto" />
            <p className="text-4xl font-bold text-white">{counts[index]} +</p>
            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarRentStatus;
