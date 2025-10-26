import heroImg from "../../assets/Image/hero.png";

function Hero() {
  return (
    <div className="hero-container relative min-h-screen overflow-hidden">
      <div className="hero-bg absolute inset-0 opacity-10">
        <div className="hero-circle bg-blue-600 top-20 left-10"></div>
        <div className="hero-circle bg-indigo-600 top-40 right-10 delay-700"></div>
        <div className="hero-circle bg-blue-500 bottom-20 left-1/2 delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-20 pb-12 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 animate-fade-in">
            <div className="inline-block animate-slide-in">
              <span className="badge">🚗 Premium Car Rental</span>
            </div>

            <h1 className="hero-title text-5xl lg:text-7xl font-bold leading-tight animate-slide-up">
              Welcome to
              <span className="hero-gradient block mt-2">
                Car Rental Service
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed animate-fade-in-delayed">
              Find the best cars for your journey. Experience luxury, comfort,
              and freedom on the road.
            </p>

            <div className="flex flex-wrap gap-8 pt-4">
              <div className="animate-count-up">
                <div className="text-3xl font-bold text-blue-400">500+</div>
                <div className="text-gray-400">Premium Cars</div>
              </div>
              <div className="animate-count-up delay-200">
                <div className="text-3xl font-bold text-indigo-400">50k+</div>
                <div className="text-gray-400">Happy Customers</div>
              </div>
              <div className="animate-count-up delay-400">
                <div className="text-3xl font-bold text-orange-400">24/7</div>
                <div className="text-gray-400">Support</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-delayed">
              <button className="btn-primary animate-pulse-button">
                <span className="relative z-10">Explore Now</span>
              </button>
              <button className="btn-outline">Book Now</button>
            </div>
          </div>

          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="hero-glow"></div>
            <div className="relative transform hover:scale-105 transition-transform duration-500 animate-car-entrance">
              <div className="hero-outline"></div>
              <img
                src= {heroImg}
                alt="Hero Car"
                className="relative w-full h-auto drop-shadow-2xl"
              />
            </div>

            <div className="floating-card top-10 -left-10 animate-float">
              <div className="flex items-center gap-3">
                <div className="icon-circle bg-green-500 animate-check">✓</div>
                <div className="text-white">
                  <div className="font-semibold">Verified</div>
                  <div className="text-sm text-gray-300">Quality Cars</div>
                </div>
              </div>
            </div>

            <div className="floating-card bottom-20 -right-10 animate-float delay-500">
              <div className="flex items-center gap-3">
                <div className="icon-circle bg-blue-500 animate-bolt">⚡</div>
                <div className="text-white">
                  <div className="font-semibold">Instant</div>
                  <div className="text-sm text-gray-300">Booking</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-24 wave-svg">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
}

export default Hero;
