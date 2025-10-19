function BookingDetailsModal({ car, booking, user, onClose }) {

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#111827] text-white w-[700px] rounded-2xl shadow-2xl border border-gray-700 relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-3">
          Booking Details
        </h2>

        <div className="flex gap-6 mb-8">
          <img
            src={car.image}
            alt={car.name}
            className="w-48 h-36 object-cover rounded-xl shadow-lg border border-gray-700"
          />
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold">{car.name}</h3>
              <p className="text-sm text-gray-400">
                {car.type} • {car.transmission} • {car.seats} Seats
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Fuel Type: <span className="text-orange-400">{car.fuel}</span>
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400">
                Price Per Day:
                <span className="text-orange-400 font-semibold">
                  {" "}
                  LKR {car.price_per_day}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                Condition:{" "}
                <span className="text-orange-400">{car.condition}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              📅 Booking Information
            </h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>
                Booking ID:{" "}
                <span className="text-orange-400">{booking.booking_id}</span>
              </p>
              <p>
                Booked At:{" "}
                <span className="text-orange-400">{booking.booked_at}</span>
              </p>
              <p>
                Return Date:{" "}
                <span className="text-orange-400">{booking.returned_at}</span>
              </p>
              <p>
                Duration:{" "}
                <span className="text-orange-400">{booking.time_period}</span>
              </p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
              👤 User Information
            </h4>
            <div className="text-sm text-gray-300 space-y-1">
              <p>
                Name: <span className="text-orange-400">{user.name}</span>
              </p>
              <p>
                Email: <span className="text-orange-400">{user.email}</span>
              </p>
              <p>
                Phone: <span className="text-orange-400">{user.phone}</span>
              </p>
              <p>
                Address: <span className="text-orange-400">{user.address}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 mt-8 p-5 rounded-xl border border-gray-700">
          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
            💳 Payment Details
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <p>
              Payment Method:{" "}
              <span className="text-orange-400">{booking.payment_method}</span>
            </p>
            <p>
              Transaction ID:{" "}
              <span className="text-orange-400">{booking.transaction_id}</span>
            </p>
            <p>
              Fine:{" "}
              <span className="text-orange-400 font-semibold">
                {booking.fine}
              </span>
            </p>
            <p>
              Total Price:{" "}
              <span className="text-orange-400 font-semibold">
                LKR {car.price_per_day * 12}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetailsModal;
