import { FaChair, FaGasPump, FaCogs, FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CarContent({ car }) {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-900 min-h-screen text-white px-6 md:px-20 py-10">
      <div className="mb-6">
        <p
          onClick={() => navigate("/car")}
          className="text-orange-500 hover:underline cursor-pointer"
        >
          &larr; Back to all cars
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={`/${car.image}`}
              alt={car.name}
              className="w-full h-100 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-white">{car.name}</h2>
            <p className="text-gray-400 text-sm mt-1">{car.type}</p>
          </div>

          <hr className="border-gray-700 my-4" />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <FaChair className="text-orange-500 text-xl mb-1" />
              <p className="text-gray-300 text-sm">{car.seats}</p>
            </div>
            <div className="flex flex-col items-center">
              <FaGasPump className="text-orange-500 text-xl mb-1" />
              <p className="text-gray-300 text-sm">{car.fuel}</p>
            </div>
            <div className="flex flex-col items-center">
              <FaCogs className="text-orange-500 text-xl mb-1" />
              <p className="text-gray-300 text-sm">{car.transmission}</p>
            </div>
            <div className="flex flex-col items-center">
              <FaCar className="text-orange-500 text-xl mb-1" />
              <p className="text-gray-300 text-sm">{car.doors}</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mt-6 mb-2">
              About this car
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {car.description}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-white mb-2">Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-300">
              {car.features.map((feature, index) => (
                <p
                  key={index}
                  className="bg-white/10 px-3 py-3 rounded-md hover:bg-orange-500/30 transition"
                >
                  {feature}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 h-100 shadow-lg border border-white/10 flex flex-col justify-center sticky top-25">
          <div className="flex justify-between">
            <p className="text-2xl font-semibold mb-2 text-orange-500">
              ${car.price_per_day}/day
            </p>
            <p
              className={`font-semibold mb-4 mt-2 ${
                car.availability_status === "Available"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {car.availability_status}
            </p>
          </div>

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
        </div>
      </div>
    </div>
  );
}
