import { useState, useEffect } from "react";
import { FaDownload, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../api/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const getBooking = async () => {
    try {
      const res = await api.get("/bookings");
      const bookingData = res.data.data;

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
              total: b.total,
            };
          } catch (err) {
            console.error("Error fetching customer/car info:", err);
          }
        })
      );

      setBookings(formatted);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("❌ Failed to load bookings!");
    }
  };

  const sendNotification = async (userId, message) => {
    try {
      await api.post("./notifications", {
        u_id: userId,
        text: message,
      });
    } catch (err) {
      console.error("❌ Error sending notification:", err);
    }
  };

  const updateBookingStatus = async (
    bookingId,
    carId,
    newStatus,
    licenseNo,
    userId,
    trTotal
  ) => {
    try {
      await api.put(`/bookings/${bookingId}`, { status: newStatus });

      if (newStatus === "booked") {
        await sendNotification(
          userId,
          "Your car has been booked successfully."
        );

        const transactionData = {
          booking_id: bookingId,
          transaction_amount: trTotal,
          transaction_type: "credit",
        };

        // const res = await api.put(`/cars/${carId}`, {
        //   availability_status: false,
        // });
        // if (res) {
        //   console.log("Done");
        // }

        await api.post("/transactions", transactionData);
        toast.success("💰 Transaction recorded successfully!");
      } else if (newStatus === "canceled") {
        // const res = await api.put(`/cars/${carId}`, {
        //   availability_status: true,
        // });
        // if (res) {
        //   console.log("Done");
        // }
        await sendNotification(userId, "Your booking has been canceled.");
      }

      toast.success(`✅ Car ${licenseNo} ${newStatus} successfully!`);
      getBooking();
    } catch (error) {
      console.error("❌ Error updating booking status:", error);
      toast.error("❌ Failed to update booking status!");
    }
  };

  const updateReturnDateAndFine = async (booking, returnedDate) => {
    try {
      const booked = new Date(booking.booked_at);
      const returned = new Date(returnedDate);
      const diffDays = Math.ceil((returned - booked) / (1000 * 60 * 60 * 24));
      const extraDays = Math.max(0, diffDays - booking.time_period);
      const fine = extraDays * 10;

      const updatedBooking = {
        ...booking,
        returned_at: returnedDate,
        fine: fine,
        total: booking.total + fine,
      };

      delete updatedBooking["car_info"];
      delete updatedBooking["customer_id"];
      delete updatedBooking["customer_name"];
      delete updatedBooking["license_no"];

      await api.put(`/bookings/${booking.booking_id}`, updatedBooking);
      toast.success("✅ Return date & fine updated successfully!");
      getBooking();
    } catch (error) {
      console.error("❌ Error updating return date:", error);
      toast.error("❌ Failed to update return date!");
    }
  };

  // 🗑️ Open modal instead of using window.confirm
  const openDeleteModal = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // 🗑️ Confirm deletion
  const confirmDelete = async () => {
    try {
      if (!selectedBooking) return;
      await api.delete(`/bookings/${selectedBooking.booking_id}`);
      toast.success("🗑️ Booking deleted successfully!");
      setShowModal(false);
      setSelectedBooking(null);
      getBooking();
    } catch (error) {
      console.error("❌ Error deleting booking:", error);
      toast.error("❌ Failed to delete booking!");
    }
  };

  const handleStatusChange = (id, newStatus, carId) => {
    const selectedBooking = bookings.find((b) => b.booking_id === id);
    setBookings((prev) =>
      prev.map((b) => (b.booking_id === id ? { ...b, status: newStatus } : b))
    );
    updateBookingStatus(
      id,
      carId,
      newStatus,
      selectedBooking?.license_no,
      selectedBooking?.customer_id,
      selectedBooking?.total
    );
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

  
  // ✅ Generate Excel Report
  const generateReport = () => {
    if (!bookings || bookings.length === 0) {
      toast.info("No bookings available to export!");
      return;
    }

    // Clean and format data for export
    const exportData = bookings.map((b) => ({
      "Booking ID": b.booking_id,
      "Customer Name": b.customer_name,
      "Car Info": b.car_info,
      "License No": b.license_no,
      "Booked At": b.booked_at,
      "Returned At": b.returned_at || "N/A",
      "Time Period (days)": b.time_period,
      "Fine": b.fine,
      "Total ($)": b.total,
      "Status": b.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `Bookings_Report_${new Date().toISOString().split("T")[0]}.xlsx`);
    toast.success("📊 Report downloaded successfully!");
  };

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <div className="p-6">
      <div className="flex border-b pb-4 border-gray-200 mb-10 justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Booking Management
          </h1>
          <p className="text-gray-600">
            Track all customer bookings, approve or cancel requests, and manage
            booking status.
          </p>
        </div>

        <button 
          onClick={generateReport}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-lg transition duration-200">
          <FaDownload /> Download Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Car Info
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                License No
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Customer Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Booked At
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Time Period
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Returned At
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Fine
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Total Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr
                  key={booking.booking_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-700">
                    {booking.car_info}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {booking.license_no}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {booking.customer_name}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {booking.booked_at}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {booking.time_period}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <input
                      type="date"
                      value={booking.returned_at || ""}
                      onChange={(e) =>
                        updateReturnDateAndFine(booking, e.target.value)
                      }
                      disabled={booking.status === "canceled"}
                      className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-700">{booking.fine}</td>
                  <td className="px-4 py-3 text-gray-700">$ {booking.total}</td>
                  <td className="px-4 py-3">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(
                          booking.booking_id,
                          e.target.value,
                          booking.car_id
                        )
                      }
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold border-0 focus:ring-2 focus:ring-orange-400 ${getStatusColor(
                        booking.status
                      )}`}
                       disabled={booking.status === "canceled"}
                    >
                      <option value="pending">Pending</option>
                      <option value="booked">Booked</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => openDeleteModal(booking)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition duration-200"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🧱 Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this booking?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingManagement;
