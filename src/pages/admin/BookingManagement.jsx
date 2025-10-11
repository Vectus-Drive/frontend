import { useState } from "react";

function BookingManagement() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      carName: "Volvo C40",
      carNumber: "AAB 3345",
      dateRange: "2025-09-03 to 2025-09-06",
      total: "$300",
      payment: "Offline",
      status: "Pending",
    },
    {
      id: 2,
      carName: "Toyota Corolla 2022",
      carNumber: "BBR 2241",
      dateRange: "2025-10-01 to 2025-10-04",
      total: "$280",
      payment: "Online",
      status: "Confirmed",
    },
    {
      id: 3,
      carName: "Honda Civic 2021",
      carNumber: "CAD 9055",
      dateRange: "2025-08-15 to 2025-08-17",
      total: "$250",
      payment: "Offline",
      status: "Canceled",
    },
    {
      id: 4,
      carName: "BMW X5",
      carNumber: "XYZ 5512",
      dateRange: "2025-09-12 to 2025-09-16",
      total: "$400",
      payment: "Online",
      status: "Pending",
    },
    {
      id: 5,
      carName: "Mercedes C200",
      carNumber: "KLM 8821",
      dateRange: "2025-11-02 to 2025-11-05",
      total: "$370",
      payment: "Offline",
      status: "Confirmed",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: newStatus } : b
      )
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Booking Management</h1>
        <p className="text-gray-600">
          Track all customer bookings, approve or cancel requests, and manage booking status.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Car Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Car Number
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Date Range
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Total
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Payment
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">{booking.carName}</td>
                <td className="px-4 py-3 text-gray-700">{booking.carNumber}</td>
                <td className="px-4 py-3 text-gray-700">{booking.dateRange}</td>
                <td className="px-4 py-3 font-medium">{booking.total}</td>
                <td className="px-4 py-3">{booking.payment}</td>
                <td className="px-4 py-3 text-center">
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking.id, e.target.value)
                    }
                    className={`px-3 py-1 rounded-md text-sm border font-medium ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                        : booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : "bg-red-100 text-red-700 border-red-300"
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
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
