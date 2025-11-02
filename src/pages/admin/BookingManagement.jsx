import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../api/api";

function BookingManagement() {
  const [bookings, setBookings] = useState([]);

  const getBooking = async () => {
    try {
      const res = await api.get("/bookings");
      const bookingData = res.data.data;
      console.log(bookingData.total);
      console.log(bookingData);
      
      const formatted = await Promise.all(
        bookingData.map(async (b) => {
          try {
            const [userRes, carRes] = await Promise.all([
              api.get(`/customers/${b.customer_id}`),
              api.get(`/cars/${b.car_id}`),
            ]);

            const customerName = userRes.data?.data?.name || b.customer_id;
            const carData = carRes.data?.data || {};
            const carInfo = `${carData.make || ""} - ${carData.model || ""}`;
            const licenseNo = carData.license_no || "N/A";

            return {
              booking_id: b.booking_id,
              customer_id: b.customer_id,
              customer_name: customerName,
              car_info: carInfo,
              license_no: licenseNo,
              booked_at: new Date(b.booked_at).toISOString().split("T")[0],
              time_period: b.time_period,
              returned_at: b.returned_at
                ? new Date(b.returned_at).toISOString().split("T")[0]
                : "",
              fine: b.fine ? `$${b.fine}` : "$0",
              status: b.status.toLowerCase(),
            };
          } catch (err) {
            console.error("Error fetching customer/car info:", err);
            return {
              booking_id: b.booking_id,
              customer_id: b.customer_id,
              customer_name: b.customer_id,
              car_info: b.car_id,
              license_no: "N/A",
              booked_at: new Date(b.booked_at).toISOString().split("T")[0],
              time_period: b.time_period,
              returned_at: b.returned_at
                ? new Date(b.returned_at).toISOString().split("T")[0]
                : "",
              fine: b.fine ? `$${b.fine}` : "$0",
              status: b.status.toLowerCase(),
            };
          }
        })
      );

      setBookings(formatted);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("❌ Failed to load bookings!");
    }
  };

  // ✅ Send notification
  const sendNotification = async (userId, message) => {
    try {
      await api.post("./notifications", {
        u_id: userId,
        text: message,
      });
      console.log(`📩 Notification sent to ${userId}: ${message}`);
    } catch (err) {
      console.error("❌ Error sending notification:", err);
    }
  };

  // ✅ Update booking status and send relevant notification
  const updateBookingStatus = async (bookingId, newStatus, licenseNo, userId) => {
    try {
      await api.put(`/bookings/${bookingId}`, { status: newStatus });

      if (newStatus === "booked") {
        await sendNotification(userId, "Your car has been booked successfully.");
      } else if (newStatus === "canceled") {
        await sendNotification(userId, "Your booking has been canceled.");
      }

      toast.success(`✅ Car ${licenseNo} ${newStatus} successfully!`);
    } catch (error) {
      console.error("❌ Error updating booking status:", error);
      toast.error("❌ Failed to update booking status!");
    }
  };

  // 🧮 Update return date and calculate fine
  const updateReturnDate = async (bookingId, newDate, bookedAt, timePeriod) => {
    try {
      const booked = new Date(bookedAt);
      const returned = new Date(newDate);
      const diffDays = Math.ceil((returned - booked) / (1000 * 60 * 60 * 24));
      const extraDays = Math.max(0, diffDays - timePeriod);
      const fine = extraDays * 10;

      await api.put(`/bookings/${bookingId}`, {
        returned_at: newDate,
        fine: fine,
      });

      toast.success(`✅ Return date & fine updated successfully!`);
    } catch (error) {
      console.error("❌ Error updating return date:", error);
      toast.error("❌ Failed to update return date!");
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const selectedBooking = bookings.find((b) => b.booking_id === id);

    setBookings((prev) =>
      prev.map((b) => (b.booking_id === id ? { ...b, status: newStatus } : b))
    );

    updateBookingStatus(
      id,
      newStatus,
      selectedBooking?.license_no,
      selectedBooking?.customer_id
    );
  };

  const handleReturnDateChange = (id, newDate) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.booking_id === id) {
          const booked = new Date(b.booked_at);
          const returned = new Date(newDate);
          const diffDays = Math.ceil(
            (returned - booked) / (1000 * 60 * 60 * 24)
          );
          const extraDays = Math.max(0, diffDays - b.time_period);
          const fine = extraDays * 10;
          return { ...b, returned_at: newDate, fine: `$${fine}` };
        }
        return b;
      })
    );

    const selected = bookings.find((b) => b.booking_id === id);
    if (selected) {
      updateReturnDate(id, newDate, selected.booked_at, selected.time_period);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "booked":
        return "bg-green-100 text-green-700";
      case "canceled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="p-6">
      <div className="flex border-b pb-4 border-gray-200 mb-10 justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Booking Management
          </h1>
          <p className="text-gray-600">
            Track all customer bookings, approve or cancel requests, and
            manage booking status.
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
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Car Info</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">License No</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Booked At</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Time Period</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Returned At</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Fine</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.booking_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-700">{booking.car_info}</td>
                  <td className="px-4 py-3 text-gray-700">{booking.license_no}</td>
                  <td className="px-4 py-3 text-gray-700">{booking.customer_name}</td>
                  <td className="px-4 py-3 text-gray-700">{booking.booked_at}</td>
                  <td className="px-4 py-3 text-gray-700">{booking.time_period}</td>
                  <td className="px-4 py-3 text-gray-700">
                    <input
                      type="date"
                      value={booking.returned_at || ""}
                      onChange={(e) =>
                        handleReturnDateChange(booking.booking_id, e.target.value)
                      }
                      className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-700">{booking.fine}</td>
                  <td className="px-4 py-3 text-gray-700">{booking.total}</td>
                  <td className="px-4 py-3">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.booking_id, e.target.value)
                      }
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold border-0 focus:ring-2 focus:ring-orange-400 ${getStatusColor(booking.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="booked">Booked</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingManagement;
