import { useState } from "react";
import { FaDownload } from "react-icons/fa";

function BookingManagement() {
  const [bookings, setBookings] = useState([
    {
      booking_id: 1,
      customer_id: "CUS1001",
      carNumber: "AAB 3345",
      booked_at: "2025-09-03",
      time_period: "3 Days",
      returned_at: "2025-09-06",
      fine: "$0",
      total: "$300",
      status: "Pending",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.booking_id === id ? { ...b, status: newStatus } : b))
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Booked":
        return "bg-green-100 text-green-700";
      case "Canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="p-6">
      <div className="flex border-b pb-4 border-gray-200 mb-10 justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Booking Management</h1>
          <p className="text-gray-600">
            Track all customer bookings, approve or cancel requests, and manage
            booking status.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-200">
          <FaDownload /> Download Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Booking ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Car Number</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Booked At</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Time Period</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Returned At</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fine</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {bookings.map((booking) => (
              <tr key={booking.booking_id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">{booking.booking_id}</td>
                <td className="px-4 py-3 text-gray-700">{booking.customer_id}</td>
                <td className="px-4 py-3 text-gray-700">{booking.carNumber}</td>
                <td className="px-4 py-3 text-gray-700">{booking.booked_at}</td>
                <td className="px-4 py-3 text-gray-700">{booking.time_period}</td>
                <td className="px-4 py-3 text-gray-700">{booking.returned_at}</td>
                <td className="px-4 py-3 text-gray-700">{booking.fine}</td>
                <td className="px-4 py-3 font-medium">{booking.total}</td>

                <td className="px-4 py-3">
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking.booking_id, e.target.value)
                    }
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border-0 focus:ring-2 focus:ring-orange-400 ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Booked">Booked</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingManagement;
