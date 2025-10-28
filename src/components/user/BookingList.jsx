import { FaCalendarAlt, FaClock, FaCarAlt } from "react-icons/fa";

function BookingList({ cars, onSelectCar, onCancelBooking }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-orange-400">
        My Bookings
      </h2>
      <div className="h-[2px] w-20 bg-orange-500 mb-8 rounded-full"></div>

      {!cars || cars.length === 0 ? (
        <div className="text-gray-400 bg-gray-800 p-6 rounded-xl border border-gray-700 text-center">
          No bookings found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-700">
          <table className="w-full border-collapse text-sm text-gray-300">
            <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Car Details</th>
                <th className="py-3 px-4 text-center">Fuel / Seats</th>
                <th className="py-3 px-4 text-center">Price/Day</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {cars.map((car, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 hover:bg-gray-800 transition"
                >
                  {/* Image */}
                  <td className="py-3 px-4">
                    <img
                      src={car.image}
                      alt={car.make}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                  </td>

                  {/* Car Info */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">
                      {car.make}{" "}
                      <span className="text-orange-400">{car.model}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 mt-1 gap-2">
                      <FaCarAlt className="text-orange-400" /> {car.transmission}
                    </div>
                    <div className="flex items-center text-xs text-gray-400 mt-1 gap-2">
                      <FaCalendarAlt className="text-orange-400" /> Available Now
                    </div>
                  </td>

                  {/* Fuel & Seats */}
                  <td className="py-3 px-4 text-center text-gray-300">
                    <FaClock className="inline text-orange-400 mr-1" />
                    {car.seats} Seats
                    <br />
                    {car.fuel}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 text-center font-semibold text-orange-400">
                    LKR {car.price_per_day}/day
                  </td>

                  {/* ✅ Status Badge */}
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        car.status === "Pending"
                          ? "bg-yellow-500 text-black"
                          : car.status === "Confirmed"
                          ? "bg-green-500 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {car.status || "Pending"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onSelectCar(car)}
                        className="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded-md text-white font-medium text-xs transition"
                      >
                        View
                      </button>

                      {car.status !== "Cancelled" && (
                        <button
                          onClick={() => onCancelBooking(car)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium text-xs transition"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BookingList;
