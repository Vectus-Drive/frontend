import { FaChair, FaGasPump, FaCogs, FaCar } from "react-icons/fa";

export default function CarContent() {
  return (
    <div className="bg-gray-900 min-h-screen text-white px-6 md:px-20 py-10">
      {/* Back Link */}
      <div className="mb-6">
        <p className="text-orange-500 hover:underline cursor-pointer">&larr; Back to all cars</p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="car1.jpg"
              alt="Main Car"
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex justify-between gap-3">
            <img
              src="car2.jpg"
              alt=""
              className="w-1/4 h-24 object-cover rounded-lg border border-gray-700 hover:border-orange-500 transition"
            />
            <img
              src="car3.jpg"
              alt=""
              className="w-1/4 h-24 object-cover rounded-lg border border-gray-700 hover:border-orange-500 transition"
            />
            <img
              src="car4.jpg"
              alt=""
              className="w-1/4 h-24 object-cover rounded-lg border border-gray-700 hover:border-orange-500 transition"
            />
            <img
              src="car5.jpg"
              alt=""
              className="w-1/4 h-24 object-cover rounded-lg border border-gray-700 hover:border-orange-500 transition"
            />
          </div>

          {/* Car Info */}
          <div>
            <h2 className="text-3xl font-semibold text-white">Tesla Model X</h2>
            <p className="text-gray-400 text-sm mt-1">Electric SUV</p>
          </div>

          <hr className="border-gray-700 my-4" />

          {/* Car Details Icons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <FaChair className="text-orange-500 text-xl mb-1" />
              <p className="text-gray-300 text-sm">4 Seats</p>
            </div>
            <div className="flex flex-col items-center">
              <FaGasPump className="text-orange-500 text-xl mb-1" />
              <p className="text-gray-300 text-sm">Petrol</p>
            </div>
            <div className="flex flex-col items-center">
              <FaCogs className="text-orange-500 text-xl mb-1" />
              <p className="text-gray-300 text-sm">Automatic</p>
            </div>
            <div className="flex flex-col items-center">
              <FaCar className="text-orange-500 text-xl mb-1" />
              <p className="text-gray-300 text-sm">4 Doors</p>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
              About this car
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              The Tesla Model X combines futuristic design with outstanding
              performance. With dual motor all-wheel drive, autopilot, and
              long-range capability, it redefines luxury travel for the
              eco-conscious driver.
            </p>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-white mb-2">Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-300">
              <p className="bg-white/10 px-3 py-1 rounded-md">360° Camera</p>
              <p className="bg-white/10 px-3 py-1 rounded-md">Bluetooth</p>
              <p className="bg-white/10 px-3 py-1 rounded-md">Backup Camera</p>
              <p className="bg-white/10 px-3 py-1 rounded-md">Heated Seats</p>
              <p className="bg-white/10 px-3 py-1 rounded-md">Keyless Entry</p>
              <p className="bg-white/10 px-3 py-1 rounded-md">Air Conditioning</p>
            </div>
          </div>
        </div>

        {/* Right Section — Booking Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col justify-center">
          <p className="text-2xl font-semibold mb-2 text-orange-500">$120/day</p>
          <p className="text-green-500 font-semibold mb-4">Available</p>

          <label
            htmlFor="pickup-date"
            className="text-gray-300 text-sm font-semibold"
          >
            Pickup Date
          </label>
          <input
            type="date"
            id="pickup-date"
            className="w-full bg-gray-800 text-white p-2 rounded-lg mt-1 mb-3 focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <label
            htmlFor="return-date"
            className="text-gray-300 text-sm font-semibold"
          >
            Return Date
          </label>
          <input
            type="date"
            id="return-date"
            className="w-full bg-gray-800 text-white p-2 rounded-lg mt-1 mb-4 focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-all mb-3">
            Rent Now
          </button>

          <p className="text-gray-400 text-sm text-center">
            No credit card required to reserve.
          </p>
        </div>
      </div>
    </div>
  );
}
