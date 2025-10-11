export default function CarCard({ status = "Available" }) {
  const isAvailable = status.toLowerCase() === "available";

  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg overflow-hidden max-w-sm w-full border border-white/10 hover:shadow-orange-500/20 transition-all duration-300">
        <div className="relative">
          <img
            src="car.jpg"
            alt="Car"
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex justify-between items-center w-11/12 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-1 shadow">
            <span className="text-sm text-orange-400 font-semibold">
              $120/day
            </span>
            <span
              className={`text-sm font-semibold px-2 py-1 rounded-md ${
                isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="p-5 text-center">
          <h2 className="text-white text-xl font-semibold mb-2">Tesla Model X</h2>
          <p className="text-gray-300 text-sm mb-4">
            Luxury electric SUV with autopilot and long-range performance.
          </p>
          <button
            className={`font-semibold px-5 py-2 rounded-lg transition-colors ${
              isAvailable
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-500 cursor-not-allowed text-gray-200"
            }`}
            disabled={!isAvailable}
          >
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
}
