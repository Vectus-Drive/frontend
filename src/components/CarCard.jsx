import { Link } from "react-router-dom";
import { FaGasPump, FaCogs, FaDoorOpen, FaUsers } from "react-icons/fa";

export default function CarCard({
  car_id,
  license_no,
  make,
  model,
  image,
  availability_status,
  price_per_day,
  seats,
  fuel,
  doors,
  transmission,
}) {
  const isAvailable = availability_status;

  return (
    <div className="flex justify-center items-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden max-w-sm border border-white/10 hover:shadow-orange-500/30 transition-all duration-300">
        <div className="relative">
          <img
            src={image}
            alt={make}
            className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
          />

          <span
            className={`absolute top-3 right-3 text-sm font-semibold px-2 py-1 rounded-md ${
              isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {isAvailable == true ? "Available" : "Unavailable"}
          </span>
        </div>

        <div className="p-5 text-center">
          <h2 className="text-white text-xl font-bold mb-4">{make} <span className="text-sm text-gray-300">- {model}</span></h2>

          <div className="flex justify-around items-center text-gray-300 mb-2 flex-wrap">
            <div className="flex flex-col items-center text-sm p-2 rounded-lg shadow-sm">
              <FaUsers className="mb-1 text-orange-400 text-xl" />
              {seats} Seats
            </div>
            <div className="flex flex-col items-center text-sm p-2 rounded-lg shadow-sm">
              <FaGasPump className="mb-1 text-orange-400 text-xl" />
              {fuel}
            </div>
            <div className="flex flex-col items-center text-sm p-2 rounded-lg shadow-sm">
              <FaDoorOpen className="mb-1 text-orange-400 text-xl" />
              {doors} Doors
            </div>
            <div className="flex flex-col items-center text-sm p-2 rounded-lg shadow-sm">
              <FaCogs className="mb-1 text-orange-400 text-xl" />
              {transmission}
            </div>
          </div>

          <hr className="border-gray-600 my-4" />

          <div className="flex justify-between items-center mt-4">
            <div className="text-left text-white">
              <p className="text-sm">Daily rate from</p>
              <p className="text-lg font-bold">${price_per_day}</p>
            </div>

            <Link to={`/car-details/${car_id}`}>
              <button
                className={`font-semibold px-6 py-2 rounded-lg transition-colors ${
                  isAvailable
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-gray-500 cursor-not-allowed text-gray-200"
                }`}
                disabled={!isAvailable}
              >
                Rent Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
