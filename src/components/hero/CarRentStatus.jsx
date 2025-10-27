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
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-16 md:py-20 px-6 md:px-12 lg:px-20 section-animation"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-orange-400 font-bold text-xs md:text-sm uppercase tracking-wider mb-2">
            Our Achievement
          </p>
          <h2 className="text-4xl font-extrabold mb-3">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Thousands</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-5 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-700/50 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-orange-500/20 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-600/0 group-hover:from-orange-500/10 group-hover:to-orange-600/5 transition-all duration-500 rounded-2xl"></div>
              
              <div className="relative mb-4 flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-orange-500/20 group-hover:border-orange-500/40 transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="text-orange-400 text-3xl" />
                </div>
              </div>

              <div className="relative">
                <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
                  {counts[index].toLocaleString()}+
                </p>
                
                <p className="text-sm md:text-base text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarRentStatus;