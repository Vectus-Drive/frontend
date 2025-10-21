import { FaCalendarAlt, FaClock, FaCarAlt } from "react-icons/fa";

function BookingList({ cars, onSelectCar }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-orange-400">
        My Bookings
      </h2>
      <div className="h-[2px] w-20 bg-orange-500 mb-8 rounded-full"></div>

      {(!cars || cars.length === 0) ? (
        <div className="text-gray-400 bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
          No bookings found.
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {cars.map((car, index) => (
            <div
              key={index}
              onClick={() => onSelectCar(car)}
              className="group relative bg-[#1a2537] rounded-2xl overflow-hidden border border-gray-700 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-600/20 transition-all cursor-pointer"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.make}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-white">
                    {car.make} <span className="text-orange-400">{car.model}</span>
                  </h3>
                  <span className="text-sm text-gray-400 flex items-center gap-1">
                    <FaCarAlt /> {car.transmission}
                  </span>
                </div>

                <div className="text-gray-400 text-sm mt-2 space-y-1">
                  <p>
                    <FaClock className="inline text-orange-400 mr-2" />
                    {car.seats} Seats • {car.fuel}
                  </p>
                  <p>
                    <FaCalendarAlt className="inline text-orange-400 mr-2" />
                    Available Now
                  </p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <p className="text-orange-400 font-semibold text-lg">
                    LKR {car.price_per_day}/day
                  </p>
                  <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white font-medium text-sm transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookingList;
