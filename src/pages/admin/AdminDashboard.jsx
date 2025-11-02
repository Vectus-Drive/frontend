import { useEffect, useState } from "react";
import {
  FaCar,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaDollarSign,
  FaChartLine,
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
      confirmed: "bg-gradient-to-r from-green-500 to-green-600 text-white",
      pending: "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white",
      booked: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
      completed: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
      cancelled: "bg-gradient-to-r from-red-500 to-red-600 text-white",
    };
    return colors[status] || "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
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
          color: "from-green-500 to-green-600",
          percent: Math.round((completed / total) * 100),
        },
        {
          name: "Pending",
          value: pending,
          color: "from-yellow-500 to-yellow-600",
          percent: Math.round((pending / total) * 100),
        },
        {
          name: "Cancelled",
          value: cancelled,
          color: "from-red-500 to-red-600",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-6">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Overview</span>
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 duration-300">
            <FaCalendarAlt className="text-sm" />
            Generate Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg shadow-blue-500/30">
                <FaCar className="text-white text-2xl" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">+12%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Cars</h3>
            <p className="text-3xl font-bold text-gray-800">{carCount}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-lg shadow-lg shadow-orange-500/30">
                <FaClipboardList className="text-white text-2xl" />
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">+8%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Bookings</h3>
            <p className="text-3xl font-bold text-gray-800">{bookingCount}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-3 rounded-lg shadow-lg shadow-yellow-500/30">
                <FaClock className="text-white text-2xl" />
              </div>
              <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">{pendingBookingCount}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Pending Bookings</h3>
            <p className="text-3xl font-bold text-gray-800">{pendingBookingCount}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg shadow-lg shadow-green-500/30">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">+15%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Completed Bookings</h3>
            <p className="text-3xl font-bold text-gray-800">{completedBookingCount}</p>
          </div>
        </div>

        {/* Revenue & Expenses Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 rounded-lg shadow-lg shadow-emerald-500/30">
                  <FaDollarSign className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">Total Revenue</h3>
                  <p className="text-2xl font-bold text-gray-800">$9,450</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-green-600 font-semibold flex items-center gap-1 text-sm">
                  <FaChartLine /> +3.8%
                </span>
                <p className="text-xs text-gray-500 mt-1">vs $8,920</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full shadow-sm" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg shadow-lg shadow-red-500/30">
                  <FaDollarSign className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm font-medium">Total Expenses</h3>
                  <p className="text-2xl font-bold text-gray-800">$5,620</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-green-600 font-semibold flex items-center gap-1 text-sm">
                  <FaChartLine className="rotate-180" /> -1.2%
                </span>
                <p className="text-xs text-gray-500 mt-1">vs $5,690</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full shadow-sm" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Status Distribution */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded"></span>
              Booking Status Distribution
            </h2>
            <div className="space-y-5">
              {bookingStatusData.map((status, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${status.color} shadow-md`}></div>
                      <span className="font-medium text-gray-700">{status.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-600">{status.value} bookings</span>
                      <span className="font-bold text-gray-800 min-w-[3rem] text-right">{status.percent}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${status.color} h-3 rounded-full transition-all duration-500 shadow-sm`}
                      style={{ width: `${status.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded"></span>
                Recent Bookings
              </h2>
              <button
                onClick={() => navigate("/booking")}
                className="text-sm text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              >
                View All →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3 px-2">Customer</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3 px-2">Car License</th>
                    <th className="text-left text-xs font-semibold text-gray-600 pb-3 px-2">Status</th>
                    <th className="text-right text-xs font-semibold text-gray-600 pb-3 px-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b) => (
                    <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-2 text-sm text-gray-700">{b.customer}</td>
                      <td className="py-3 px-2 text-sm text-gray-700">{b.car}</td>
                      <td className="py-3 px-2">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                            b.status
                          )} shadow-md`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm font-bold text-gray-800 text-right">
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
    </div>
  );
}

export default AdminDashboard;