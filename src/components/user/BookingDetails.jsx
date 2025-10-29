import { FaCalendar, FaClock, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";

export default function BookingDetailsModal({ selectedBooking, setSelectedBooking }) {
  if (!selectedBooking) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-lg w-full p-6 relative">
        <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
          <h2 className="text-xl font-bold text-white">Booking Details</h2>
          <button
            onClick={() => setSelectedBooking(null)}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4 text-slate-300">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <FaCalendar className="text-orange-400" size={14} />
                <p className="text-sm text-slate-400">Pick-up Date</p>
              </div>
              <p className="font-medium">{selectedBooking.booked_at}</p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <FaCalendar className="text-orange-400" size={14} />
                <p className="text-sm text-slate-400">Return Date</p>
              </div>
              <p className="font-medium">{selectedBooking.returned_at}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaClock className="text-orange-400" size={14} />
            <p className="text-sm text-slate-400">Duration</p>
          </div>
          <p className="font-medium">{selectedBooking.time_period}</p>

          <div className="flex items-center gap-2">
            <FaCreditCard className="text-orange-400" size={14} />
            <p className="text-sm text-slate-400">Payment Method</p>
          </div>
          <p className="font-medium">{selectedBooking.payment_method}</p>

          <div className="mt-4 border-t border-slate-700 pt-3"></div>

          <div className="flex justify-between mt-4">
            <span className="text-slate-400">Status:</span>
            <span
              className={`font-medium px-3 py-1 rounded-full text-sm ${
                selectedBooking.status === "completed"
                  ? "bg-green-500/20 text-green-400"
                  : selectedBooking.status === "active"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {selectedBooking.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
