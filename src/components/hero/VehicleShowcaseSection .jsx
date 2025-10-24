import React from 'react';

const VehicleShowcaseSection = () => {
  return (
    <section className="relative bg-[#0f1729] py-20 section-animation">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
            OUR FLEET
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            Premium Vehicle Selection
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Experience luxury and comfort with our handpicked collection of modern Hyundai vehicles
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 max-w-7xl mx-auto">
          <div className="flex-1 space-y-10 lg:pr-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <div className="w-7 h-7 bg-orange-500 rounded"></div>
              </div>
              <div>
                <div className="text-orange-500 text-2xl lg:text-3xl font-bold mb-3">Latest Models</div>
                <p className="text-slate-400 leading-relaxed text-base lg:text-lg">
                  Drive the newest Hyundai vehicles with cutting-edge technology and superior comfort
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <div className="w-7 h-7 bg-orange-500 rounded"></div>
              </div>
              <div>
                <div className="text-orange-500 text-2xl lg:text-3xl font-bold mb-3">Well Maintained</div>
                <p className="text-slate-400 leading-relaxed text-base lg:text-lg">
                  Every vehicle is regularly serviced and thoroughly inspected for your safety
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <div className="w-7 h-7 bg-orange-500 rounded"></div>
              </div>
              <div>
                <div className="text-orange-500 text-2xl lg:text-3xl font-bold mb-3">Flexible Options</div>
                <p className="text-slate-400 leading-relaxed text-base lg:text-lg">
                  Choose from daily, weekly, or monthly rental plans that suit your needs
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 lg:flex-[1.3]">
            <div className="relative">
              <img
                src="/pngwing.com (2).png"
                alt="Hyundai Vehicle Fleet"
                className="w-full h-auto object-contain scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcaseSection;