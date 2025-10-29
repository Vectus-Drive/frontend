import { FaCalendar, FaClock, FaCreditCard } from "react-icons/fa";

export default function BookingCard({ booking, car, setSelectedBooking }) {
  
  return (
    <div
      className="bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-orange-400/50 transition-all cursor-pointer"
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto">
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                {car.make} {car.model}
              </h3>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === "active"
                  ? "bg-blue-500/20 text-blue-400"
                  : booking.status === "completed"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-slate-300">
              <FaCalendar className="text-orange-400" size={14} />
              <div>
                <p className="text-xs text-slate-500">Pick-up</p>
                <p className="text-sm font-medium">{booking.booked_at}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <FaCalendar className="text-orange-400" size={14} />
              <div>
                <p className="text-xs text-slate-500">Return</p>
                <p className="text-sm font-medium">{booking.returned_at}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <FaClock className="text-orange-400" size={14} />
              <div>
                <p className="text-xs text-slate-500">Duration</p>
                <p className="text-sm font-medium">{booking.time_period}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <FaCreditCard className="text-orange-400" size={14} />
              <div>
                <p className="text-xs text-slate-500">Total</p>
                <p className="text-sm font-medium text-green-400">
                  {booking.total}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg text-xs">
              {car.fuel}
            </span>
            <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg text-xs">
              {car.transmission}
            </span>
            <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-lg text-xs">
              {car.seats} Seats
            </span>
          </div>

        
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
            >
              Cancel Booking
            </button>
            <button
              onClick={() => setSelectedBooking(booking)}
              className="px-4 ml-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors"
            >
              View details
            </button>
        </div>
      </div>
    </div>
  );
}
