import BookingCard from "./BookingCard";

export default function BookingTabs({ bookings, setSelectedBooking }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden flex flex-col h-[80vh]">
      <div className="border-b border-slate-700 px-6 py-4 flex-shrink-0">
        <h2 className="text-lg font-semibold text-orange-400">My Bookings</h2>
      </div>

      <div className="p-6 space-y-4 overflow-y-auto flex-1 scrollbar-hide">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            booking.status !== "canceled" && <BookingCard
              key={booking.booking_id}
              booking={booking}
              car={booking.car}
              setSelectedBooking={setSelectedBooking}
            />
          ))
        ) : (
          <p className="text-slate-400 text-center py-8">
            You have no bookings yet.
          </p>
        )}
      </div>
    </div>
  );
}
