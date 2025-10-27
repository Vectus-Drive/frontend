import React from 'react';

const FeatureCard = ({ title, description, delay }) => (
  <div 
    className="flex items-start gap-5 group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-orange-500/20 group-hover:border-orange-500/40 transition-all duration-300 group-hover:scale-110">
      <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg shadow-orange-500/30"></div>
    </div>
    <div className="flex-1">
      <h3 className="text-white text-xl lg:text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
        {description}
      </p>
    </div>
  </div>
);

const VehicleShowcaseSection = () => {
  const features = [
    {
      title: "Latest Models",
      description: "Drive the newest Hyundai vehicles with cutting-edge technology and superior comfort"
    },
    {
      title: "Well Maintained",
      description: "Every vehicle is regularly serviced and thoroughly inspected for your safety"
    },
    {
      title: "Flexible Options",
      description: "Choose from daily, weekly, or monthly rental plans that suit your needs"
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-[#0f1729] to-slate-900 py-16 md:py-20 px-6 md:px-12 lg:px-20 section-animation overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-400 font-bold text-xs md:text-sm uppercase tracking-wider">
            Our Fleet
          </span>
          <h2 className="text-4xl font-extrabold mt-3 mb-4">
            Premium Vehicle Selection
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            Experience luxury and comfort with our handpicked collection of modern Hyundai vehicles
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-5 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">
          
          <div className="flex-1 space-y-8 lg:space-y-10 w-full max-w-xl lg:max-w-none">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>

          <div className="flex-1 lg:flex-[1.2] w-full max-w-2xl">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-blue-500/20 rounded-2xl blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <img
                  src="/pngwing.com (2).png"
                  alt="Premium Hyundai Vehicle Fleet"
                  className="w-full h-auto object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500 scale-110"
                />
              </div>

              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcaseSection;