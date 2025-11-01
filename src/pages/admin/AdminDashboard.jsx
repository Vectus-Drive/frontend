import { useEffect, useState } from "react";
import {
  FaCar,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import StatOverviewCard from "../../components/admin/StatOverviewCard";
import CarStatsCard from "../../components/admin/CarStatsCard";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [carCount, setCarCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [pendingBookingCount, setPendingBookingCount] = useState(0);
  const [completedBookingCount, setCompletedBookingCount] = useState(0);
  const [cancelledBookingCount, setCancelledBookingCount] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [bookingStatusData, setBookingStatusData] = useState([]);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      booked: "bg-blue-100 text-blue-700",
      completed: "bg-blue-100 text-blue-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getStatusData = async () => {
    try {
      const [resCars, resBookings] = await Promise.all([
        api.get("/cars"),
        api.get("/bookings"),
      ]);

      const cars = resCars.data.data || [];
      const bookings = resBookings.data.data || [];

      setCarCount(cars.length);

      let pending = 0,
        completed = 0,
        cancelled = 0;

      bookings.forEach((b) => {
        if (b.status === "pending") pending++;
        else if (b.status === "booked" || b.status === "completed") completed++;
        else if (b.status === "canceled") cancelled++;
      });

      setPendingBookingCount(pending);
      setCompletedBookingCount(completed);
      setCancelledBookingCount(cancelled);
      setBookingCount(bookings.length);

      const total = bookings.length || 1;
      const bookingStats = [
        {
          name: "Completed",
          value: completed,
          color: "bg-green-500",
          percent: Math.round((completed / total) * 100),
        },
        {
          name: "Pending",
          value: pending,
          color: "bg-yellow-500",
          percent: Math.round((pending / total) * 100),
        },
        {
          name: "Cancelled",
          value: cancelled,
          color: "bg-red-500",
          percent: Math.round((cancelled / total) * 100),
        },
      ];
      setBookingStatusData(bookingStats);

      const latestBookings = bookings.slice(-5).reverse();

      const bookingDetails = await Promise.all(
        latestBookings.map(async (b) => {
          try {
            const [customerRes, carRes] = await Promise.all([
              api.get(`/customers/${b.customer_id}`),
              api.get(`/cars/${b.car_id}`),
            ]);

            const customerName = customerRes.data.data?.name || "Unknown Customer";
            const carLicense = carRes.data.data?.license_no || "Unknown License";

            return {
              id: b.booking_id,
              customer: customerName,
              car: carLicense,
              status: b.status,
              amount: b.fine || 0,
            };
          } catch (error) {
            console.error("Error fetching booking details:", error);
            return {
              id: b.booking_id,
              customer: b.customer_id,
              car: b.car_id,
              status: b.status,
              amount: b.fine || 0,
            };
          }
        })
      );

      setRecentBookings(bookingDetails);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    getStatusData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <FaCalendarAlt className="text-sm" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatOverviewCard
          title="Total Cars"
          count={carCount}
          icon={<FaCar className="text-white text-2xl" />}
          color="bg-blue-500"
        />
        <StatOverviewCard
          title="Total Bookings"
          count={bookingCount}
          icon={<FaClipboardList className="text-white text-2xl" />}
          color="bg-orange-500"
        />
        <StatOverviewCard
          title="Pending Bookings"
          count={pendingBookingCount}
          icon={<FaClock className="text-white text-2xl" />}
          color="bg-yellow-500"
        />
        <StatOverviewCard
          title="Completed Bookings"
          count={completedBookingCount}
          icon={<FaCheckCircle className="text-white text-2xl" />}
          color="bg-green-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CarStatsCard title="Total Revenue" value={9450} change="+3.8%" comparedValue={8920} />
        <CarStatsCard title="Total Expenses" value={5620} change="-1.2%" comparedValue={5690} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Booking Status Distribution</h2>
          <div className="space-y-4">
            {bookingStatusData.map((status, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${status.color}`}></span>
                    <span className="font-medium text-gray-700">{status.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">{status.value} bookings</span>
                    <span className="font-semibold text-gray-800">{status.percent}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`${status.color} h-3 rounded-full transition-all`}
                    style={{ width: `${status.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>
            <button
              onClick={() => navigate("/booking")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Customer</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Car License</th>
                  <th className="text-left text-xs font-semibold text-gray-600 pb-3">Status</th>
                  <th className="text-right text-xs font-semibold text-gray-600 pb-3">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm text-gray-700">{b.customer}</td>
                    <td className="py-3 text-sm text-gray-700">{b.car}</td>
                    <td className="py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                          b.status
                        )}`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm font-semibold text-gray-800 text-right">
                      ${b.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
